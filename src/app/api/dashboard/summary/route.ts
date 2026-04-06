import { NextRequest, NextResponse } from 'next/server';
import { getRecentExecutions, getWorkflows, categorize, computeHealthScore } from '@/lib/n8n';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateFrom = url.searchParams.get('from') || new Date().toISOString().split('T')[0];

    const [executions, workflows] = await Promise.all([
      getRecentExecutions(200).catch(() => []),
      getWorkflows().catch(() => []),
    ]);

    // Build workflow name lookup from the workflows list
    const wfNameMap: Record<string, string> = {};
    for (const w of workflows) wfNameMap[w.id] = w.name;

    const activeWorkflows = workflows.filter((w: any) => w.active);
    const todayExecs = executions.filter((e: any) => {
      const d = e.startedAt?.split('T')[0];
      return d >= dateFrom;
    });

    // Compute per-workflow error stats
    const wfErrors: Record<string, { errors: number; total: number; name: string }> = {};
    for (const e of executions) {
      const id = e.workflowId || e.workflow?.id;
      const name = wfNameMap[id] || e.workflowName || e.workflow?.name || 'Unknown';
      if (!id) continue;
      if (!wfErrors[id]) wfErrors[id] = { errors: 0, total: 0, name };
      wfErrors[id].total++;
      if (e.status === 'error') wfErrors[id].errors++;
    }

    const needsAttention = Object.entries(wfErrors)
      .map(([id, s]) => ({
        workflow: s.name,
        workflow_id: id,
        error_count: s.errors,
        error_rate: s.total > 0 ? s.errors / s.total : 0,
        severity: (s.total > 0 && s.errors / s.total > 0.5 ? 'critical' : 'warning') as 'critical' | 'warning',
      }))
      .filter((w) => w.error_count > 0)
      .sort((a, b) => b.error_rate * b.error_count - a.error_rate * a.error_count)
      .slice(0, 5);

    // Compute system health as weighted average
    const allScores = Object.values(wfErrors).map((s) =>
      computeHealthScore(s.total > 0 ? s.errors / s.total : 0)
    );
    const avgScore = allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 100;

    // Build activity feed from recent executions
    const activityFeed = todayExecs
      .sort((a: any, b: any) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
      .slice(0, 20)
      .map((e: any) => ({
        time: new Date(e.startedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }),
        type: e.status === 'error' ? 'error' : 'execution',
        desc: `${wfNameMap[e.workflowId || e.workflow?.id] || e.workflowName || e.workflow?.name || 'Unknown Workflow'} ${e.status === 'success' ? 'completed' : e.status}`,
        status: e.status,
        category: categorize(wfNameMap[e.workflowId || e.workflow?.id] || e.workflowName || e.workflow?.name || ''),
      }));

    const erroring = new Set(needsAttention.map((n) => n.workflow_id)).size;

    const summary = {
      system_health: { score: avgScore, trend: avgScore > 75 ? 'stable' : 'degrading', prev_score: avgScore - 3 },
      messages_today: { sent: 0, delivered: 0, read: 0, delivery_rate: 0 },
      active_workflows: {
        total: workflows.length,
        active: activeWorkflows.length,
        erroring,
      },
      needs_attention: needsAttention,
      activity_feed: activityFeed,
    };

    return NextResponse.json(summary);
  } catch (err: any) {
    console.error('Dashboard summary error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getRecentExecutions, getWorkflows, computeHealthScore, categorize } from '@/lib/n8n';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [executions, workflows] = await Promise.all([
      getRecentExecutions(200).catch(() => []),
      getWorkflows().catch(() => []),
    ]);

    const wfNameMap: Record<string, string> = {};
    for (const w of workflows) wfNameMap[w.id] = w.name;

    const wfStats: Record<string, { errors: number; total: number; name: string; durations: number[] }> = {};
    for (const e of executions) {
      const id = e.workflowId || e.workflow?.id;
      const name = wfNameMap[id] || e.workflowName || e.workflow?.name || 'Unknown';
      if (!id) continue;
      if (!wfStats[id]) wfStats[id] = { errors: 0, total: 0, name, durations: [] };
      wfStats[id].total++;
      if (e.status === 'error') wfStats[id].errors++;
      if (e.stoppedAt && e.startedAt) {
        const dur = (new Date(e.stoppedAt).getTime() - new Date(e.startedAt).getTime()) / 1000;
        wfStats[id].durations.push(dur);
      }
    }

    const workflowHealthList = Object.entries(wfStats).map(([id, s]) => {
      const errorRate = s.total > 0 ? s.errors / s.total : 0;
      const avgDuration = s.durations.length > 0
        ? s.durations.reduce((a, b) => a + b, 0) / s.durations.length
        : 0;
      return {
        workflow_id: id,
        workflow_name: s.name,
        category: categorize(s.name),
        total_runs: s.total,
        errors: s.errors,
        error_rate: Math.round(errorRate * 100) / 100,
        avg_duration: Math.round(avgDuration * 10) / 10,
        health_score: computeHealthScore(errorRate),
        trend: errorRate > 0.3 ? 'degrading' : errorRate < 0.1 ? 'improving' : 'stable',
      };
    });

    const allScores = workflowHealthList.map((w) => w.health_score);
    const overallScore = allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 100;

    const today = new Date().toISOString().split('T')[0];
    const todayExecs = executions.filter((e: any) => e.startedAt?.startsWith(today));

    return NextResponse.json({
      workflows: workflowHealthList.sort((a, b) => a.health_score - b.health_score),
      overall_score: overallScore,
      total_runs_today: todayExecs.length,
      total_errors_today: todayExecs.filter((e: any) => e.status === 'error').length,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

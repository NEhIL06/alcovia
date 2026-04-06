import { NextRequest, NextResponse } from 'next/server';
import { getRecentExecutions, getWorkflows, categorize } from '@/lib/n8n';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const status = url.searchParams.get('status');
    const workflowId = url.searchParams.get('workflow_id');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const [rawExecs, workflows] = await Promise.all([
      getRecentExecutions(200).catch(() => []),
      getWorkflows().catch(() => []),
    ]);
    const wfNameMap: Record<string, string> = {};
    for (const w of workflows) wfNameMap[w.id] = w.name;
    let executions = rawExecs;

    if (status) {
      executions = executions.filter((e: any) => e.status === status);
    }
    if (workflowId) {
      executions = executions.filter((e: any) => (e.workflowId || e.workflow?.id) === workflowId);
    }

    const total = executions.length;
    const page = executions.slice(offset, offset + limit).map((e: any) => ({
      workflow_name: wfNameMap[e.workflowId || e.workflow?.id] || e.workflowName || e.workflow?.name || 'Unknown',
      workflow_id: e.workflowId || e.workflow?.id || '',
      started_at: e.startedAt,
      stopped_at: e.stoppedAt,
      mode: e.mode,
      status: e.status,
      duration: e.stoppedAt && e.startedAt
        ? Math.round((new Date(e.stoppedAt).getTime() - new Date(e.startedAt).getTime()) / 1000)
        : 0,
      category: categorize(wfNameMap[e.workflowId || e.workflow?.id] || e.workflowName || e.workflow?.name || ''),
    }));

    return NextResponse.json({ executions: page, total, limit, offset });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

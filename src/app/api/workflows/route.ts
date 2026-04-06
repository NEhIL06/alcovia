import { NextResponse } from 'next/server';
import { getWorkflows, categorize, computeHealthScore } from '@/lib/n8n';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const workflows = await getWorkflows().catch(() => []);

    const enriched = workflows.map((w: any) => ({
      workflow_id: w.id,
      workflow_name: w.name,
      description: w.description || '',
      category: categorize(w.name),
      is_active: w.active,
      qc_status: 'Pending',
      error_rate_7d: 0,
      health_score: w.active ? 85 : 50,
      last_execution: w.updatedAt || '',
      node_count: w.triggerCount || 0,
    }));

    return NextResponse.json({ workflows: enriched, count: enriched.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

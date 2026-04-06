const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8n.alcovia.life';
const N8N_KEY = process.env.N8N_API_KEY || '';

async function n8nFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${N8N_BASE}${path}`, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'X-N8N-API-KEY': N8N_KEY,
      ...options?.headers,
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`n8n API error: ${res.status} ${res.statusText}`);
  return res.json();
}

export async function getRecentExecutions(limit = 200): Promise<any[]> {
  const data = await n8nFetch(`/api/v1/executions?limit=${limit}&includeData=false`);
  return data.data || [];
}

export async function getWorkflows(): Promise<any[]> {
  const data = await n8nFetch('/api/v1/workflows');
  return data.data || [];
}

export async function getWorkflowById(id: string): Promise<any> {
  return n8nFetch(`/api/v1/workflows/${id}`);
}

export function categorize(workflowName: string): string {
  const name = workflowName.toLowerCase();
  if (name.includes('reminder') || name.includes('session') || name.includes('gamma') || name.includes('action items')) return 'session_mgmt';
  if (name.includes('score') || name.includes('revision') || name.includes('worksheet') || name.includes('tracker creation') || name.includes('quarterly') || name.includes('masters alert')) return 'academic';
  if (name.includes('gtm') || name.includes('marketing') || name.includes('instagram') || name.includes('linkedin') || name.includes('attio') || name.includes('lead') || name.includes('neuromarketing') || name.includes('litmus') || name.includes('utm') || name.includes('aisensy cta') || name.includes('converted database')) return 'gtm';
  if (name.includes('workshop') || name.includes('razorpay') || name.includes('meta ads')) return 'workshop';
  if (name.includes('error handler') || name.includes('self heal') || name.includes('log collector') || name.includes('dashboard data') || name.includes('docrepository') || name.includes('gdrive') || name.includes('meeting notes')) return 'infra';
  if (name.includes('salary') || name.includes('payout') || name.includes('counsellor') || name.includes('leave') || name.includes('reimbursement') || name.includes('onboarding') || name.includes('employee')) return 'hr';
  if (name.includes('attendance') || name.includes('check-in') || name.includes('homework')) return 'attendance';
  if (name.includes('quiz')) return 'quiz';
  if (name.includes('tutor') || name.includes('reconciliation')) return 'tutor';
  if (name.includes('form') || name.includes('personality')) return 'onboarding';
  return 'other';
}

export function computeHealthScore(errorRate: number, _avgDuration?: number): number {
  const errorComponent = (1 - Math.min(errorRate, 1)) * 60;
  const durationComponent = 20; // default stable
  const recencyComponent = 20; // default recent
  return Math.round(errorComponent + durationComponent + recencyComponent);
}

export function healthColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

export function healthLabel(score: number): string {
  if (score >= 80) return 'Healthy';
  if (score >= 50) return 'Needs Attention';
  return 'Critical';
}

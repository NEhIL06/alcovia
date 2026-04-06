export interface DashboardSummary {
  system_health: { score: number; trend: string; prev_score: number };
  messages_today: { sent: number; delivered: number; read: number; delivery_rate: number };
  active_workflows: { total: number; active: number; erroring: number };
  needs_attention: AttentionItem[];
  activity_feed: ActivityItem[];
}

export interface AttentionItem {
  workflow: string;
  workflow_id: string;
  error_count: number;
  error_rate: number;
  severity: 'critical' | 'warning';
  last_error?: string;
}

export interface ActivityItem {
  time: string;
  type: 'message' | 'execution' | 'error';
  desc: string;
  status: string;
  category?: string;
}

export interface Execution {
  workflow_name: string;
  description: string;
  workflow_id: string;
  started_at: string;
  stopped_at: string;
  mode: string;
  status: string;
  date_value: string;
  duration: number;
  category: string;
}

export interface WorkflowInfo {
  workflow_id: string;
  workflow_name: string;
  description: string;
  category: string;
  is_active: boolean;
  qc_status: string;
  error_rate_7d: number;
  health_score: number;
  last_execution: string;
}

export interface Message {
  template_name: string;
  description: string;
  timestamp: string;
  recipient: string;
  contact: string;
  variables: string;
  status_meta: string;
  message_id: string;
  sent_at: string;
  delivered_at: string;
  read_at: string;
  category: string;
}

export interface HealthOverview {
  workflows: WorkflowHealth[];
  overall_score: number;
  total_runs_today: number;
  total_errors_today: number;
}

export interface WorkflowHealth {
  workflow_id: string;
  date: string;
  total_runs: number;
  errors: number;
  error_rate: number;
  avg_duration: number;
  health_score: number;
  trend: string;
}

export interface StudentReport {
  student_name: string;
  period: string;
  summary: StudentSupportRow[];
  recent_activity: StudentActivity[];
  total_messages: number;
  overall_engagement: number;
}

export interface StudentSupportRow {
  activity: string;
  type: string;
  value: string;
  msgs_sent: number;
  engagement: number;
}

export interface StudentActivity {
  date: string;
  time: string;
  description: string;
  status: 'read' | 'delivered' | 'sent' | 'clicked' | 'missed';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export type DatePreset = 'today' | 'yesterday' | 'last7' | 'last30' | 'custom';

export const CATEGORY_LABELS: Record<string, string> = {
  session_mgmt: 'Session Management',
  academic: 'Academic Monitoring',
  gtm: 'GTM / Marketing',
  workshop: 'Workshop & Events',
  infra: 'Infrastructure',
  hr: 'HR & Operations',
  attendance: 'Attendance',
  quiz: 'Quizzes',
  tutor: 'Tutor Reconciliation',
  onboarding: 'Onboarding & Forms',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<string, string> = {
  session_mgmt: '#6366f1',
  academic: '#8b5cf6',
  gtm: '#ec4899',
  workshop: '#f59e0b',
  infra: '#6b7280',
  hr: '#10b981',
  attendance: '#3b82f6',
  quiz: '#f97316',
  tutor: '#14b8a6',
  onboarding: '#a855f7',
  other: '#64748b',
};

'use client';

import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import type { ActivityItem } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/types';

interface Props {
  items: ActivityItem[];
}

const statusIcons: Record<string, React.ReactNode> = {
  success: <CheckCircle2 size={14} className="text-green-400" />,
  error: <XCircle size={14} className="text-red-400" />,
  waiting: <Clock size={14} className="text-yellow-400" />,
  canceled: <AlertCircle size={14} className="text-gray-400" />,
};

export default function ActivityFeed({ items }: Props) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3">
        Today&apos;s Activity Feed
      </h2>
      <div className="space-y-1">
        {items.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] py-4">No activity yet today</p>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[var(--bg-card)] transition-colors">
            <span className="text-xs tabular-nums text-[var(--text-muted)] w-12 shrink-0 font-mono">
              {item.time}
            </span>
            <span className="shrink-0">{statusIcons[item.status] || statusIcons.success}</span>
            <span className="text-sm text-[var(--text-primary)] truncate flex-1">{item.desc}</span>
            {item.category && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-card)] text-[var(--text-muted)] shrink-0">
                {CATEGORY_LABELS[item.category] || item.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

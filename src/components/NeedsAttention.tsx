'use client';

import { AlertTriangle, ChevronRight } from 'lucide-react';
import type { AttentionItem } from '@/lib/types';

interface Props {
  items: AttentionItem[];
}

export default function NeedsAttention({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3 flex items-center gap-2">
        <AlertTriangle size={14} className="text-[var(--warning)]" />
        Needs Attention
      </h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="card flex items-center justify-between py-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2 h-2 rounded-full ${item.severity === 'critical' ? 'bg-red-500 animate-pulse-dot' : 'bg-yellow-500'}`}
              />
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  &quot;{item.workflow}&quot;
                  <span className="text-[var(--text-secondary)] font-normal ml-2">
                    {item.severity === 'critical' ? `${item.error_count} errors` : `error rate climbing`}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums text-[var(--text-muted)]">
                {Math.round(item.error_rate * 100)}% error rate
              </span>
              <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: string;
  icon?: React.ReactNode;
}

export default function MetricCard({ title, value, subtitle, trend, trendValue, color, icon }: MetricCardProps) {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-[var(--text-muted)]';
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : Minus;

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">{title}</span>
        {icon && <span className="text-[var(--text-muted)]">{icon}</span>}
      </div>
      <div className="flex items-end gap-3">
        <span
          className="text-3xl font-semibold tabular-nums leading-none"
          style={color ? { color } : undefined}
        >
          {value}
        </span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor} mb-0.5`}>
            <TrendIcon size={12} />
            {trendValue}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mt-2 text-xs text-[var(--text-secondary)]">{subtitle}</p>
      )}
    </div>
  );
}

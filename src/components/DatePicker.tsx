'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import type { DatePreset } from '@/lib/types';

interface Props {
  value: DatePreset;
  onChange: (preset: DatePreset, from?: string, to?: string) => void;
}

const PRESETS: { label: string; value: DatePreset }[] = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 Days', value: 'last7' },
  { label: 'Last 30 Days', value: 'last30' },
];

export default function DatePicker({ value, onChange }: Props) {
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="flex items-center gap-1 bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--border)]">
      {PRESETS.map((p) => (
        <button
          key={p.value}
          onClick={() => { onChange(p.value); setShowCustom(false); }}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            value === p.value && !showCustom
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          {p.label}
        </button>
      ))}
      <button
        onClick={() => setShowCustom(!showCustom)}
        className={`px-2 py-1.5 rounded-md transition-colors ${
          showCustom ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
      >
        <Calendar size={14} />
      </button>
    </div>
  );
}

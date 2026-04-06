'use client';

import { useEffect, useState, useCallback } from 'react';
import { Activity, MessageSquare, Workflow, User, LogOut } from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import NeedsAttention from '@/components/NeedsAttention';
import ActivityFeed from '@/components/ActivityFeed';
import ChatBot from '@/components/ChatBot';
import DatePicker from '@/components/DatePicker';
import type { DashboardSummary, DatePreset } from '@/lib/types';
import { healthColor } from '@/lib/n8n';
import Link from 'next/link';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [datePreset, setDatePreset] = useState<DatePreset>('today');
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date();
      let from: string;
      if (datePreset === 'yesterday') {
        const d = new Date(today);
        d.setDate(d.getDate() - 1);
        from = d.toISOString().split('T')[0];
      } else if (datePreset === 'last7') {
        const d = new Date(today);
        d.setDate(d.getDate() - 7);
        from = d.toISOString().split('T')[0];
      } else if (datePreset === 'last30') {
        const d = new Date(today);
        d.setDate(d.getDate() - 30);
        from = d.toISOString().split('T')[0];
      } else {
        from = today.toISOString().split('T')[0];
      }
      const res = await fetch(`/api/dashboard/summary?from=${from}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [datePreset]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  function handleLogout() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold tracking-tight">ALCOVIA OPS</h1>
            <nav className="hidden md:flex items-center gap-1 ml-6">
              <Link href="/" className="px-3 py-1.5 text-xs font-medium rounded-md bg-[var(--accent)] text-white">
                Overview
              </Link>
              <Link href="/ops" className="px-3 py-1.5 text-xs font-medium rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]">
                Ops Console
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <DatePicker value={datePreset} onChange={(p) => setDatePreset(p)} />
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-secondary)]">{user.name}</span>
                <button onClick={handleLogout} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <User size={16} />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {loading && !data ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <>
            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="System Health"
                value={`${data.system_health.score}%`}
                color={healthColor(data.system_health.score)}
                trend={data.system_health.score > data.system_health.prev_score ? 'up' : data.system_health.score < data.system_health.prev_score ? 'down' : 'stable'}
                trendValue={`from ${data.system_health.prev_score}%`}
                icon={<Activity size={16} />}
              />
              <MetricCard
                title="Messages Sent"
                value={data.messages_today.sent || 'N/A'}
                subtitle={data.messages_today.sent > 0 ? `${Math.round(data.messages_today.delivery_rate * 100)}% delivered` : 'Message tracking via AiSensy'}
                icon={<MessageSquare size={16} />}
              />
              <MetricCard
                title="Active Workflows"
                value={`${data.active_workflows.active}/${data.active_workflows.total}`}
                subtitle={data.active_workflows.erroring > 0 ? `${data.active_workflows.erroring} currently erroring` : 'All clear'}
                color={data.active_workflows.erroring > 0 ? '#f59e0b' : undefined}
                icon={<Workflow size={16} />}
              />
            </div>

            {/* Needs Attention */}
            <NeedsAttention items={data.needs_attention} />

            {/* Activity Feed */}
            <ActivityFeed items={data.activity_feed} />
          </>
        ) : (
          <div className="text-center py-20 text-[var(--text-muted)]">
            Failed to load dashboard data. Check your n8n connection.
          </div>
        )}
      </main>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}

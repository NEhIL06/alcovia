'use client';

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Search, Filter, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/types';
import { healthColor } from '@/lib/n8n';

type Tab = 'executions' | 'workflows' | 'messages' | 'health';

export default function OpsPage() {
  const [tab, setTab] = useState<Tab>('executions');
  const [executions, setExecutions] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [healthData, setHealthData] = useState<any>(null);
  const [messagesData, setMessagesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (tab === 'executions') {
        const params = new URLSearchParams({ limit: '100' });
        if (statusFilter) params.set('status', statusFilter);
        const res = await fetch(`/api/executions?${params}`);
        const data = await res.json();
        setExecutions(data.executions || []);
      } else if (tab === 'workflows') {
        const res = await fetch('/api/workflows');
        const data = await res.json();
        setWorkflows(data.workflows || []);
      } else if (tab === 'messages') {
        const res = await fetch('/api/messages');
        const data = await res.json();
        setMessagesData(data);
      } else if (tab === 'health') {
        const res = await fetch('/api/health/overview');
        const data = await res.json();
        setHealthData(data);
      }
    } catch (err) {
      console.error('Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  }, [tab, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = search
    ? (tab === 'executions' ? executions : workflows).filter((item: any) =>
        (item.workflow_name || item.name || '').toLowerCase().includes(search.toLowerCase())
      )
    : tab === 'executions' ? executions : workflows;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'executions', label: 'Executions' },
    { key: 'workflows', label: 'Workflows' },
    { key: 'messages', label: 'Messages' },
    { key: 'health', label: 'Health Dashboard' },
  ];

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-lg font-semibold tracking-tight">OPS CONSOLE</h1>
          </div>
          <button onClick={fetchData} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-[var(--accent)] text-[var(--accent)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* Search + Filter */}
        {(tab === 'executions' || tab === 'workflows') && (
          <div className="flex gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by workflow name..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
              />
            </div>
            {tab === 'executions' && (
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
                <option value="canceled">Canceled</option>
              </select>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Executions Tab */}
            {tab === 'executions' && (
              <div className="card overflow-hidden p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                      <th className="text-left px-4 py-3 text-xs font-medium">Workflow</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Status</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Mode</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Started</th>
                      <th className="text-right px-4 py-3 text-xs font-medium">Duration</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filtered as any[]).map((exec, i) => (
                      <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)] transition-colors">
                        <td className="px-4 py-2.5 font-medium truncate max-w-[200px]">{exec.workflow_name}</td>
                        <td className="px-4 py-2.5">
                          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                            exec.status === 'success' ? 'bg-green-500/10 text-green-400' :
                            exec.status === 'error' ? 'bg-red-500/10 text-red-400' :
                            'bg-gray-500/10 text-gray-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              exec.status === 'success' ? 'bg-green-400' :
                              exec.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                            }`} />
                            {exec.status}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[var(--text-secondary)] text-xs">{exec.mode}</td>
                        <td className="px-4 py-2.5 text-[var(--text-secondary)] text-xs tabular-nums font-mono">
                          {exec.started_at ? new Date(exec.started_at).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }) : '-'}
                        </td>
                        <td className="px-4 py-2.5 text-right text-[var(--text-secondary)] text-xs tabular-nums font-mono">
                          {exec.duration ? `${exec.duration}s` : '-'}
                        </td>
                        <td className="px-4 py-2.5">
                          <span
                            className="text-[10px] px-1.5 py-0.5 rounded"
                            style={{ backgroundColor: `${CATEGORY_COLORS[exec.category] || '#64748b'}20`, color: CATEGORY_COLORS[exec.category] || '#64748b' }}
                          >
                            {CATEGORY_LABELS[exec.category] || exec.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-8 text-[var(--text-muted)]">No executions found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Workflows Tab */}
            {tab === 'workflows' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {(filtered as any[]).map((wf, i) => (
                  <div key={i} className="card">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-medium truncate pr-2">{wf.workflow_name}</h3>
                      <span
                        className="text-lg font-semibold tabular-nums shrink-0"
                        style={{ color: healthColor(wf.health_score) }}
                      >
                        {wf.health_score}
                      </span>
                    </div>
                    {wf.description && (
                      <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{wf.description}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${CATEGORY_COLORS[wf.category] || '#64748b'}20`, color: CATEGORY_COLORS[wf.category] || '#64748b' }}
                      >
                        {CATEGORY_LABELS[wf.category] || wf.category}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${wf.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>
                        {wf.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Messages Tab */}
            {tab === 'messages' && messagesData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="card"><p className="text-xs text-[var(--text-secondary)]">Total Sent</p><p className="text-2xl font-semibold tabular-nums">{messagesData.funnel?.sent || 0}</p></div>
                  <div className="card"><p className="text-xs text-[var(--text-secondary)]">Success</p><p className="text-2xl font-semibold tabular-nums text-green-400">{messagesData.funnel?.success || 0}</p></div>
                  <div className="card"><p className="text-xs text-[var(--text-secondary)]">Errors</p><p className="text-2xl font-semibold tabular-nums text-red-400">{messagesData.funnel?.errors || 0}</p></div>
                  <div className="card"><p className="text-xs text-[var(--text-secondary)]">Delivery Rate</p><p className="text-2xl font-semibold tabular-nums">{messagesData.funnel?.delivery_rate || 0}%</p></div>
                  <div className="card"><p className="text-xs text-[var(--text-secondary)]">Read Rate</p><p className="text-2xl font-semibold tabular-nums">{messagesData.funnel?.read_rate || 0}%</p></div>
                </div>
                <div className="card overflow-hidden p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                        <th className="text-left px-4 py-3 text-xs font-medium">Template</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Recipient</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Status</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Timestamp</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Delivered</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Read</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messagesData.messages?.slice(0, 100).map((msg: any, i: number) => (
                        <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)]">
                          <td className="px-4 py-2.5 truncate max-w-[200px]">{msg.template_name}</td>
                          <td className="px-4 py-2.5 text-[var(--text-secondary)]">{msg.recipient}</td>
                          <td className="px-4 py-2.5">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${msg.status_meta === 'Success' || msg.status_meta === 'True' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                              {msg.status_meta}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)] font-mono">{msg.timestamp}</td>
                          <td className="px-4 py-2.5 text-xs text-[var(--text-muted)] font-mono">{msg.delivered_at || '-'}</td>
                          <td className="px-4 py-2.5 text-xs text-[var(--text-muted)] font-mono">{msg.read_at || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Health Tab */}
            {tab === 'health' && healthData && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="card">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Overall Health</p>
                    <p className="text-3xl font-semibold tabular-nums" style={{ color: healthColor(healthData.overall_score) }}>
                      {healthData.overall_score}%
                    </p>
                  </div>
                  <div className="card">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Runs Today</p>
                    <p className="text-3xl font-semibold tabular-nums">{healthData.total_runs_today}</p>
                  </div>
                  <div className="card">
                    <p className="text-xs text-[var(--text-secondary)] mb-1">Errors Today</p>
                    <p className="text-3xl font-semibold tabular-nums text-red-400">{healthData.total_errors_today}</p>
                  </div>
                </div>
                <div className="card overflow-hidden p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                        <th className="text-left px-4 py-3 text-xs font-medium">Workflow</th>
                        <th className="text-right px-4 py-3 text-xs font-medium">Health</th>
                        <th className="text-right px-4 py-3 text-xs font-medium">Runs</th>
                        <th className="text-right px-4 py-3 text-xs font-medium">Errors</th>
                        <th className="text-right px-4 py-3 text-xs font-medium">Error Rate</th>
                        <th className="text-right px-4 py-3 text-xs font-medium">Avg Duration</th>
                        <th className="text-left px-4 py-3 text-xs font-medium">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {healthData.workflows?.map((wf: any, i: number) => (
                        <tr key={i} className="border-b border-[var(--border)] hover:bg-[var(--bg-card-hover)]">
                          <td className="px-4 py-2.5 font-medium truncate max-w-[200px]">{wf.workflow_name}</td>
                          <td className="px-4 py-2.5 text-right tabular-nums font-mono" style={{ color: healthColor(wf.health_score) }}>
                            {wf.health_score}
                          </td>
                          <td className="px-4 py-2.5 text-right tabular-nums font-mono text-[var(--text-secondary)]">{wf.total_runs}</td>
                          <td className="px-4 py-2.5 text-right tabular-nums font-mono text-red-400">{wf.errors}</td>
                          <td className="px-4 py-2.5 text-right tabular-nums font-mono text-[var(--text-secondary)]">
                            {Math.round(wf.error_rate * 100)}%
                          </td>
                          <td className="px-4 py-2.5 text-right tabular-nums font-mono text-[var(--text-secondary)]">{wf.avg_duration}s</td>
                          <td className="px-4 py-2.5 text-xs">
                            <span className={`${wf.trend === 'improving' ? 'text-green-400' : wf.trend === 'degrading' ? 'text-red-400' : 'text-[var(--text-muted)]'}`}>
                              {wf.trend}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

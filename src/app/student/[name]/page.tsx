'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Download, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const statusIcons: Record<string, React.ReactNode> = {
  read: <CheckCircle2 size={14} className="text-green-400" />,
  delivered: <Eye size={14} className="text-blue-400" />,
  sent: <Clock size={14} className="text-yellow-400" />,
  clicked: <CheckCircle2 size={14} className="text-indigo-400" />,
  missed: <XCircle size={14} className="text-red-400" />,
};

const statusLabels: Record<string, string> = {
  read: 'Read', delivered: 'Delivered', sent: 'Sent', clicked: 'Clicked', missed: 'Missed',
};

export default function StudentPage() {
  const params = useParams();
  const studentName = decodeURIComponent(params.name as string);
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState(studentName);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/messages').then(r => r.json()).then(d => {
      if (d.recipients) setStudents(d.recipients);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/student/${encodeURIComponent(selectedStudent)}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [selectedStudent]);

  const totalMsgs = data?.total_messages || 0;
  const avgEngagement = data?.overall_engagement || 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[var(--bg-surface)]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <ArrowLeft size={16} />
            </Link>
            <h1 className="text-lg font-semibold tracking-tight">ALCOVIA</h1>
            <span className="text-sm text-[var(--text-secondary)]">Student Support Report</span>
          </div>
          <button className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-card)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
            <Download size={12} />
            Export PDF
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-6 space-y-6">
        <div className="flex items-center gap-4">
          <label className="text-sm text-[var(--text-secondary)]">Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {(students.length > 0 ? students : [studentName]).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs text-[var(--text-muted)]">All Time</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data ? (
          <>
            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3">Summary of Support Delivered</h2>
              <div className="card overflow-hidden p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] text-[var(--text-secondary)]">
                      <th className="text-left px-4 py-3 text-xs font-medium">Activity</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-medium">Value</th>
                      <th className="text-right px-4 py-3 text-xs font-medium">Msgs</th>
                      <th className="text-right px-4 py-3 text-xs font-medium">Engaged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.summary?.map((row: any, i: number) => (
                      <tr key={i} className="border-b border-[var(--border)]">
                        <td className="px-4 py-2.5">{row.activity}</td>
                        <td className="px-4 py-2.5 text-[var(--text-secondary)]">{row.type}</td>
                        <td className="px-4 py-2.5 text-[var(--text-secondary)]">{row.value}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-mono">{row.msgs_sent}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`tabular-nums font-mono ${row.engagement >= 90 ? 'text-green-400' : row.engagement >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {row.engagement}%
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(!data.summary || data.summary.length === 0) && (
                      <tr><td colSpan={5} className="px-4 py-8 text-center text-[var(--text-muted)]">No messages found for this student</td></tr>
                    )}
                    {data.summary?.length > 0 && (
                      <tr className="bg-[var(--bg-card-hover)] font-medium">
                        <td className="px-4 py-2.5" colSpan={3}>TOTAL</td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-mono">{totalMsgs}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-mono">{avgEngagement}%</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3">Recent Activity Log</h2>
              <div className="space-y-2">
                {data.recent_activity?.map((act: any, i: number) => (
                  <div key={i} className="card flex items-center gap-4 py-3">
                    <span className="text-xs text-[var(--text-muted)] w-20 shrink-0 font-mono">{act.date}</span>
                    <span className="text-xs text-[var(--text-muted)] w-20 shrink-0 font-mono">{act.time}</span>
                    <span className="text-sm flex-1">{act.description}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {statusIcons[act.status] || statusIcons.sent}
                      <span className={`text-xs ${act.status === 'missed' ? 'text-red-400' : 'text-[var(--text-secondary)]'}`}>
                        {statusLabels[act.status] || act.status}
                      </span>
                    </div>
                  </div>
                ))}
                {(!data.recent_activity || data.recent_activity.length === 0) && (
                  <p className="text-sm text-[var(--text-muted)] py-4">No recent activity</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 text-[var(--text-muted)]">No data found for this student.</div>
        )}
      </main>
    </div>
  );
}

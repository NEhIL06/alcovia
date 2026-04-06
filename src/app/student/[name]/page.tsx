'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Download, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_STUDENTS = ['Aksh', 'Riya', 'Arjun', 'Priya', 'Vikas', 'Ananya', 'Rohan', 'Meera'];

const MOCK_SUPPORT: any[] = [
  { activity: 'Session Mgmt', type: '24h Reminder', value: 'Attendance', msgs_sent: 4, engagement: 100 },
  { activity: 'Session Mgmt', type: '2h Reminder', value: 'No-shows', msgs_sent: 4, engagement: 100 },
  { activity: 'Academic', type: 'Gamma Deck', value: 'Summary', msgs_sent: 2, engagement: 100 },
  { activity: 'Skill Building', type: 'Quiz Link', value: 'Aptitude', msgs_sent: 12, engagement: 85 },
];

const MOCK_ACTIVITY: any[] = [
  { date: 'Apr 5', time: '6:00 PM', description: 'Quiz Sent - Logical Reasoning', status: 'read' },
  { date: 'Apr 4', time: '9:00 AM', description: '24h Reminder - Career Counselling', status: 'read' },
  { date: 'Apr 4', time: '11:00 AM', description: '2h Reminder - Session starts!', status: 'read' },
  { date: 'Apr 1', time: '2:30 PM', description: 'Gamma Deck - Ivy League Strategy', status: 'clicked' },
  { date: 'Mar 30', time: '6:00 PM', description: 'Quiz Sent - Current Affairs', status: 'missed' },
];

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
  const [selectedStudent, setSelectedStudent] = useState(studentName || MOCK_STUDENTS[0]);

  const totalMsgs = MOCK_SUPPORT.reduce((acc, s) => acc + s.msgs_sent, 0);
  const avgEngagement = Math.round(MOCK_SUPPORT.reduce((acc, s) => acc + s.engagement, 0) / MOCK_SUPPORT.length);

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
        {/* Student Selector */}
        <div className="flex items-center gap-4">
          <label className="text-sm text-[var(--text-secondary)]">Student:</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[var(--accent)]"
          >
            {MOCK_STUDENTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs text-[var(--text-muted)]">Last 30 Days</span>
        </div>

        {/* Summary of Support */}
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            Summary of Support Delivered
          </h2>
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
                {MOCK_SUPPORT.map((row, i) => (
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
                <tr className="bg-[var(--bg-card-hover)] font-medium">
                  <td className="px-4 py-2.5" colSpan={3}>TOTAL</td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-mono">{totalMsgs}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums font-mono">{avgEngagement}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] mb-3">
            Recent Activity Log
          </h2>
          <div className="space-y-2">
            {MOCK_ACTIVITY.map((act, i) => (
              <div key={i} className="card flex items-center gap-4 py-3">
                <span className="text-xs text-[var(--text-muted)] w-16 shrink-0 font-mono">{act.date}</span>
                <span className="text-xs text-[var(--text-muted)] w-16 shrink-0 font-mono">{act.time}</span>
                <span className="text-sm flex-1">{act.description}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {statusIcons[act.status]}
                  <span className={`text-xs ${act.status === 'missed' ? 'text-red-400' : 'text-[var(--text-secondary)]'}`}>
                    {statusLabels[act.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

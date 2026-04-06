import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8n.alcovia.life';

export async function GET(req: NextRequest, { params }: { params: Promise<{ name: string }> }) {
  try {
    const { name } = await params;
    const studentName = decodeURIComponent(name);

    const res = await fetch(`${N8N_BASE}/webhook/dashboard-read-messages`, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json({ error: 'Failed to read messages' }, { status: 502 });

    const allMessages: any[] = await res.json();

    // Filter messages for this student (match by first name or full name)
    const studentMsgs = allMessages.filter((m: any) => {
      const r = (m['Recipient'] || '').toLowerCase();
      const s = studentName.toLowerCase();
      return r === s || r.startsWith(s) || r.includes(s);
    });

    // Build summary by template type
    const templateGroups: Record<string, { type: string; activity: string; value: string; msgs: number; read: number }> = {};
    for (const m of studentMsgs) {
      const tmpl = m['Template Name'] || 'Other';
      if (!templateGroups[tmpl]) {
        let activity = 'Other';
        let value = 'Support';
        if (tmpl.includes('quiz')) { activity = 'Skill Building'; value = 'Aptitude'; }
        else if (tmpl.includes('24 reminder') || tmpl.includes('24h')) { activity = 'Session Mgmt'; value = 'Attendance'; }
        else if (tmpl.includes('2 hr') || tmpl.includes('2hr')) { activity = 'Session Mgmt'; value = 'No-shows'; }
        else if (tmpl.includes('Gamma') || tmpl.includes('gamma')) { activity = 'Academic'; value = 'Summary'; }
        templateGroups[tmpl] = { type: tmpl.replace(/_/g, ' '), activity, value, msgs: 0, read: 0 };
      }
      templateGroups[tmpl].msgs++;
      if (m['Read'] || m['Status (Success to Meta server?)'] === 'True') templateGroups[tmpl].read++;
    }

    const summary = Object.values(templateGroups).map(g => ({
      activity: g.activity,
      type: g.type,
      value: g.value,
      msgs_sent: g.msgs,
      engagement: g.msgs > 0 ? Math.round((g.read / g.msgs) * 100) : 0,
    }));

    // Build activity log
    const recentActivity = studentMsgs
      .sort((a: any, b: any) => new Date(b['DateValue'] || 0).getTime() - new Date(a['DateValue'] || 0).getTime())
      .slice(0, 20)
      .map((m: any) => {
        const hasRead = m['Read'] || m['Status (Success to Meta server?)'] === 'True';
        const status = hasRead ? 'read' : m['Status (Success to Meta server?)'] === 'Success' ? 'delivered' : m['Status (Success to Meta server?)'] === 'error' ? 'missed' : 'sent';
        return {
          date: m['DateValue'] || '',
          time: (m['Timestamp'] || '').split(',').pop()?.trim() || '',
          description: `${(m['Template Name'] || '').replace(/_/g, ' ')} - ${(m['Variables'] || '').split(',')[0]}`,
          status,
        };
      });

    const totalMsgs = studentMsgs.length;
    const totalRead = studentMsgs.filter((m: any) => m['Read'] || m['Status (Success to Meta server?)'] === 'True').length;

    return NextResponse.json({
      student_name: studentName,
      period: 'All Time',
      summary,
      recent_activity: recentActivity,
      total_messages: totalMsgs,
      overall_engagement: totalMsgs > 0 ? Math.round((totalRead / totalMsgs) * 100) : 0,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

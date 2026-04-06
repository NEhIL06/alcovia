import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const N8N_BASE = process.env.N8N_BASE_URL || 'https://n8n.alcovia.life';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const template = url.searchParams.get('template');
    const recipient = url.searchParams.get('recipient');

    const res = await fetch(`${N8N_BASE}/webhook/dashboard-read-messages`, { next: { revalidate: 300 } });
    if (!res.ok) return NextResponse.json({ error: 'Failed to read messages' }, { status: 502 });

    let messages: any[] = await res.json();

    if (template) {
      messages = messages.filter((m: any) => m['Template Name']?.toLowerCase().includes(template.toLowerCase()));
    }
    if (recipient) {
      messages = messages.filter((m: any) => m['Recipient']?.toLowerCase().includes(recipient.toLowerCase()));
    }

    const transformed = messages.map((m: any) => ({
      template_name: m['Template Name'] || '',
      description: m['Description'] || '',
      timestamp: m['Timestamp'] || '',
      recipient: m['Recipient'] || '',
      contact: String(m['Contact'] || ''),
      variables: m['Variables'] || '',
      status_meta: m['Status (Success to Meta server?)'] || '',
      date_value: m['DateValue'] || '',
      message_id: String(m['Message_ID'] || ''),
      sent_at: String(m['Sent '] || ''),
      delivered_at: String(m['Delivered '] || ''),
      read_at: String(m['Read'] || ''),
      status_update: m['Status Update'] || '',
    }));

    const templates = [...new Set(transformed.map(m => m.template_name))];
    const recipients = [...new Set(transformed.map(m => m.recipient))].sort();
    const successCount = transformed.filter(m => m.status_meta === 'Success' || m.status_meta === 'True').length;
    const errorCount = transformed.filter(m => m.status_meta === 'error').length;
    const deliveredCount = transformed.filter(m => m.delivered_at).length;
    const readCount = transformed.filter(m => m.read_at).length;

    return NextResponse.json({
      messages: transformed,
      total: transformed.length,
      templates,
      recipients,
      funnel: {
        sent: transformed.length,
        success: successCount,
        errors: errorCount,
        delivered: deliveredCount,
        read: readCount,
        delivery_rate: transformed.length > 0 ? Math.round((successCount / transformed.length) * 100) : 0,
        read_rate: deliveredCount > 0 ? Math.round((readCount / deliveredCount) * 100) : 0,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

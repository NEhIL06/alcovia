import { NextRequest, NextResponse } from 'next/server';
import { getRecentExecutions, getWorkflows, categorize } from '@/lib/n8n';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();
    if (!question) return NextResponse.json({ error: 'Question required' }, { status: 400 });

    const [executions, workflows] = await Promise.all([
      getRecentExecutions(100).catch(() => []),
      getWorkflows().catch(() => []),
    ]);

    const recentErrors = executions
      .filter((e: any) => e.status === 'error')
      .slice(0, 10)
      .map((e: any) => ({
        workflow: e.workflowName || e.workflow?.name,
        time: e.startedAt,
        status: e.status,
      }));

    const wfSummary = workflows
      .filter((w: any) => w.active)
      .map((w: any) => `${w.name} (${categorize(w.name)})`)
      .join(', ');

    const todayExecs = executions.filter((e: any) => {
      const d = e.startedAt?.split('T')[0];
      return d === new Date().toISOString().split('T')[0];
    });

    const systemPrompt = `You are an operations assistant for Alcovia's automation system.

RECENT EXECUTIONS (last 24 hours): ${todayExecs.length} total, ${todayExecs.filter((e: any) => e.status === 'error').length} errors

ACTIVE WORKFLOWS: ${wfSummary}

RECENT ERRORS: ${JSON.stringify(recentErrors)}

Answer the user's question about operations. Be concise and specific.
If asked about a failure, explain: what workflow, when, and what the likely cause is based on the error pattern.`;

    // Call Gemini API
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      // Fallback: generate a smart response without Gemini
      const answer = generateFallbackAnswer(question, todayExecs, recentErrors, workflows);
      return NextResponse.json({ answer });
    }

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nQuestion: ${question}` }] },
          ],
          generationConfig: { temperature: 0.3, maxOutputTokens: 500 },
        }),
      }
    );

    if (geminiRes.ok) {
      const geminiData = await geminiRes.json();
      const answer = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
      return NextResponse.json({ answer });
    }

    const answer = generateFallbackAnswer(question, todayExecs, recentErrors, workflows);
    return NextResponse.json({ answer });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function generateFallbackAnswer(question: string, todayExecs: any[], recentErrors: any[], workflows: any[]): string {
  const q = question.toLowerCase();
  const totalToday = todayExecs.length;
  const errorsToday = todayExecs.filter((e: any) => e.status === 'error').length;
  const successRate = totalToday > 0 ? Math.round(((totalToday - errorsToday) / totalToday) * 100) : 100;

  if (q.includes('health') || q.includes('status') || q.includes('how are things')) {
    return `System is running with ${successRate}% success rate today. ${totalToday} executions total, ${errorsToday} errors. ${workflows.filter((w: any) => w.active).length} active workflows.`;
  }
  if (q.includes('error') || q.includes('fail') || q.includes('broke')) {
    if (recentErrors.length === 0) return 'No recent errors found. All systems running smoothly.';
    const topErrors = recentErrors.slice(0, 3).map((e: any) => `${e.workflow} at ${new Date(e.time).toLocaleTimeString()}`).join('; ');
    return `Recent errors: ${topErrors}. Total ${errorsToday} errors today out of ${totalToday} executions.`;
  }
  if (q.includes('gamma') || q.includes('deck')) {
    const gammaExecs = todayExecs.filter((e: any) => (e.workflowName || e.workflow?.name || '').toLowerCase().includes('gamma'));
    if (gammaExecs.length === 0) return 'No Gamma deck executions found today. The workflow may not have been triggered.';
    const last = gammaExecs[gammaExecs.length - 1];
    return `Gamma deck workflow ran ${gammaExecs.length} times today. Last run: ${last.status} at ${new Date(last.startedAt).toLocaleTimeString()}.`;
  }
  if (q.includes('message') || q.includes('sent')) {
    return `${totalToday} workflow executions today. Message delivery stats are tracked in the Messages tab.`;
  }

  return `Today: ${totalToday} executions, ${errorsToday} errors (${successRate}% success). ${workflows.filter((w: any) => w.active).length} active workflows. Ask me about specific workflows or errors for more details.`;
}

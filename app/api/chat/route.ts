import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { chatPacks } from '@/lib/chatbot';
import { dictionaries, CONTACT } from '@/lib/content';

/**
 * Hari AI — the AI half of the hybrid assistant.
 *
 * The widget matches its rule-based knowledge base FIRST, in the browser, at
 * zero cost. This endpoint is only called when nothing matched, and only when
 * NEXT_PUBLIC_CHAT_AI is switched on. Without an API key the site behaves
 * exactly as it does today: rules, then the honest "I don't know" fallback.
 *
 * The model is given the site's own content and told to answer from it or
 * decline. That matters more here than in most chatbots: the firm sells
 * regulatory coordination and technical due diligence, so a confidently wrong
 * answer about a TFDA timeline is worse than no answer.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_QUESTION = 500;

function buildGrounding(lang: 'en' | 'zh') {
  const t = dictionaries[lang];
  const pack = chatPacks[lang];

  const capabilities = t.capabilities.items
    .map((c) => `- ${c.title}: ${c.summary}`)
    .join('\n');
  const industries = t.industries.items.map((i) => `- ${i.title}: ${i.body}`).join('\n');
  const faq = t.faq.items.map((f) => `Q: ${f.q}\nA: ${f.a}`).join('\n\n');
  const knowledge = pack.intents.map((i) => `- ${i.answer}`).join('\n');

  return `# HariNex Global Co., Ltd. (瀚瑞國際股份有限公司)

Cross-border technology transfer, trade advisory and technical localisation.
Head office: ${t.network.locations[0].address}
Contact: ${CONTACT.email} · ${CONTACT.phone} (also WhatsApp)

## Capabilities
${capabilities}

## Industries
${industries}

## Frequently asked
${faq}

## Additional established facts
${knowledge}`;
}

const RULES_EN = `You are Hari AI, the assistant on the HariNex Global website.

Answer ONLY from the reference material below. It is the complete set of facts you have about this company.

Hard rules:
- If the reference material does not answer the question, say so plainly and point the person to the contact form. Never guess, never extrapolate, never invent a figure, price, timeline or credential.
- Never state a regulatory approval timeline, submission outcome, or legal position. Those are decided by authorities, not by HariNex. If asked, say the pathway depends on the authority and the specific product, and offer a conversation.
- Never present HariNex as a law firm, accountancy practice or investment adviser. It is none of those.
- Do not invent statistics, client names, case studies or project results. None are in the reference material.
- Answer in 2-4 sentences. Plain prose, no markdown, no headings, no bullet lists.
- Do not include internal or system XML tags in your response.
- Write in English.`;

const RULES_ZH = `你是 Hari AI，瀚瑞國際（HariNex Global）網站上的智能助理。

只能依據以下參考資料作答。那是你掌握關於本公司的全部事實。

嚴格規則：
- 若參考資料無法回答該問題，請據實說明，並引導對方使用聯絡表單。切勿臆測、切勿外推、切勿杜撰任何數字、價格、時程或資格證明。
- 切勿陳述法規核准時程、送件結果或法律見解。該等事項由主管機關認定，而非由瀚瑞決定。若被問及，請說明路徑取決於主管機關與該特定產品，並邀請進一步洽談。
- 切勿將瀚瑞呈現為律師事務所、會計師事務所或投資顧問。本公司均非上述任一者。
- 切勿杜撰統計數據、客戶名稱、案例研究或專案成果。參考資料中並無此類內容。
- 請以二至四句話作答。使用平實散文，不使用 Markdown、標題或條列。
- 回覆中不得包含任何內部或系統 XML 標籤。
- 請以繁體中文作答。`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Not an error — the site is designed to run without this.
    return NextResponse.json({ ok: false, reason: 'not-configured' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  const { message, lang } = (body ?? {}) as { message?: unknown; lang?: unknown };
  const question = typeof message === 'string' ? message.trim().slice(0, MAX_QUESTION) : '';
  const language: 'en' | 'zh' = lang === 'zh' ? 'zh' : 'en';

  if (!question) {
    return NextResponse.json({ ok: false, reason: 'bad-request' }, { status: 400 });
  }

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 400,
      // A grounded two-to-four sentence answer needs no deliberation, and this
      // is a chat widget where latency is felt. Disabled thinking is permitted
      // at effort 'high' or below on this model.
      thinking: { type: 'disabled' },
      output_config: { effort: 'low' },
      system: [
        {
          type: 'text',
          text: `${language === 'zh' ? RULES_ZH : RULES_EN}\n\n---\n\n${buildGrounding(language)}`,
          // The grounding is identical on every request, so cache it.
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [{ role: 'user', content: question }],
    });

    // Check stop_reason before reading content — a refusal returns HTTP 200
    // with content empty or partial.
    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ ok: false, reason: 'declined' }, { status: 200 });
    }

    const answer = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();

    if (!answer) {
      return NextResponse.json({ ok: false, reason: 'empty' }, { status: 200 });
    }

    return NextResponse.json({ ok: true, answer, source: 'ai' });
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ ok: false, reason: 'busy' }, { status: 200 });
    }
    console.error('[chat] Claude request failed:', error);
    return NextResponse.json({ ok: false, reason: 'error' }, { status: 200 });
  }
}

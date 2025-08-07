import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  // 🧠 These are the issues you detected from logic
  const majorIssues = ['low saves', 'low likes', 'low shares', 'low comments']

  const prompt = `
You are an Instagram growth strategist.

For each of the following major issues, suggest a fix plan with 2–3 unique, practical, and non-generic suggestions. Output should be a JSON object where keys are the issues and values are arrays of suggestions.

Issues:
${majorIssues.map((issue) => `- ${issue}`).join('\n')}

Format:
{
  "low saves": [
    "Fix tip 1 for saves",
    "Fix tip 2 for saves"
    and more suggestions,
  ],
  "low shares": [
    "Fix tip 1 for shares",
    "Fix tip 2 for shares",
    and more suggestions
  ]
}

Avoid repetition. Keep the language helpful and fresh. Respond only with valid JSON.
`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
    }),
  })

  const data = await response.json()
  const raw = data?.choices?.[0]?.message?.content || ''

  try {
    const json = JSON.parse(raw)
    return NextResponse.json({ fixPlan: json })
  } catch (e) {
    console.error('❌ Failed to parse JSON:', raw)
    return NextResponse.json({ error: 'Failed to parse result', raw }, { status: 500 })
  }

}


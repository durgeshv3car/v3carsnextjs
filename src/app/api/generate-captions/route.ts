import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const niche = 'Anime'
  const description = 'Naruto vs Sasuke emotional fight edit with sad music'

  const prompt = `
You are an Instagram caption and hashtag generator for anime reels.

Given:
Niche: ${niche}
Reel Description: ${description}

Generate output in pure JSON format like this:

{
  "caption": "short caption here (max 2 lines, with emojis, NO hashtags)",
  "hashtags": ["#tag1", "#tag2", ...] // 10 lowercase hashtags only
}

Strict rules:
- Caption: no hashtags inside, just text + emojis
- Hashtags: 10 only, all lowercase, related to reel & viral reach
- Don't include '#' inside caption. Just in hashtags.
`;  

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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', // replace with your real key
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
    return NextResponse.json(json)
  } catch (e) {
    console.error('❌ Failed to parse JSON:', raw)
    return NextResponse.json({ error: 'Failed to parse result', raw }, { status: 500 })
  }
}

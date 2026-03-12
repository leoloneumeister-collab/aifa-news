import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const portfolioRankSchema = z.object({
  rankedArticles: z.array(z.object({
    articleIndex: z.number().describe("The zero-based index of the article in the input array."),
    relevanceScore: z.number().min(0).max(100).describe("How relevant this article is to the user's portfolio, 0-100."),
    impactExplanation: z.string().describe("One sentence explaining why this article impacts the user's portfolio and which holding(s) are affected."),
  }))
});

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { articles, holdings } = body;

    if (!articles || !holdings || holdings.length === 0) {
      return NextResponse.json({ error: "Articles and holdings are required" }, { status: 400 });
    }

    // Build a string description of the portfolio
    const portfolioDescription = holdings.map((h: any) => {
      if (h.mode === "percentage") {
        return `${h.symbol}: ${h.percentage}% allocation`;
      } else {
        return `${h.symbol}: ${h.shares} shares @ $${h.price} ($${(Number(h.shares) * Number(h.price)).toFixed(0)} total)`;
      }
    }).join('\n');

    // Build a concise article list
    const articleList = articles.map((a: any, i: number) => 
      `[${i}] "${a.title}" — ${(a.summary || '').substring(0, 150)}`
    ).join('\n\n');

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: portfolioRankSchema,
      prompt: `You are a portfolio impact analyst. A user has the following portfolio:\n\n${portfolioDescription}\n\nBelow are news articles. For EACH article, score its relevance to the user's specific portfolio from 0 to 100, where:\n- 90-100: Directly about one of their holdings\n- 60-89: About the sector, competitors, or supply chain of their holdings\n- 30-59: Macro/economic news that indirectly affects their holdings\n- 0-29: Not relevant to their portfolio\n\nInclude ALL articles in your response. For each, provide a brief impact explanation mentioning which specific holding(s) are affected and how.\n\nArticles:\n${articleList}`
    });

    return NextResponse.json({ 
      rankedArticles: object.rankedArticles.sort((a, b) => b.relevanceScore - a.relevanceScore)
    });

  } catch (error: any) {
    console.error("Portfolio Rank API Error:", error);
    return NextResponse.json(
      { error: 'Failed to rank articles', details: error.message },
      { status: 500 }
    );
  }
}

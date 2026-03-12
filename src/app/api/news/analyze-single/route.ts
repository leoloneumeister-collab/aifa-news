import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const singleNewsAnalysisSchema = z.object({
  category: z.string().describe("The sector or general theme of the news (e.g., Technology, Energy, Geopolitics, Finance)."),
  stockName: z.string().nullable().describe("The specific company this news is primarily about, if any. Null if general news."),
  tickerName: z.string().nullable().describe("The official stock ticker symbol corresponding to the stockName (e.g., AAPL, TSLA), if applicable. Null if none."),
  summary: z.string().describe("A concise summary of the core news event, under 60 words."),
  portfolioImpact: z.string().describe("An explanation of how this news could positively or negatively impact financial portfolios. E.g., 'Disruptions in Iran could decrease global oil supply, leading to higher oil prices and benefiting energy stocks.'")
});

export const maxDuration = 60; // Allow 60 seconds execution time for AI queries

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt } = body;

    if (!title) {
      return NextResponse.json({ error: "Article title is required" }, { status: 400 });
    }

    const articleText = `
      Title: ${title}
      Excerpt/Content: ${excerpt || 'No excerpt provided.'}
    `;

    console.log(`Analyzing single article: ${title}`);

    // Generate structured analysis using OpenAI's cheapest standard model currently available
    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: singleNewsAnalysisSchema,
      prompt: `Analyze the following financial news article snippet and extract the most accurate information you can. If you cannot determine the specific stock, set it to null.\n\nArticle Data:\n${articleText}`
    });

    return NextResponse.json({ 
      message: "Analysis successful",
      analysis: object
    });

  } catch (error: any) {
    console.error("API Error in Single News Analysis:", error);
    return NextResponse.json(
      { error: 'Failed to analyze the news article', details: error.message },
      { status: 500 }
    );
  }
}

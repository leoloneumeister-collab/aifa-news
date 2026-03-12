import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { adminDb } from '@/lib/firebase/admin';

// The schema representing the structured data we want to extract
const newsAnalysisSchema = z.object({
  category: z.string().describe("The sector or general theme of the news (e.g., Technology, Energy, Geopolitics, Finance)."),
  stockName: z.string().nullable().describe("The specific company this news is primarily about, if any. Null if general news."),
  tickerName: z.string().nullable().describe("The official stock ticker symbol corresponding to the stockName (e.g., AAPL, TSLA), if applicable. Null if none."),
  summary: z.string().describe("A concise summary of the core news event, under 60 words."),
  portfolioImpact: z.string().describe("An explanation of how this news could positively or negatively impact financial portfolios. E.g., 'Disruptions in Iran could decrease global oil supply, leading to higher oil prices and benefiting energy stocks.'")
});

export const maxDuration = 60; // Allow 60 seconds execution time for AI queries

export async function POST() {
  try {
    // 1. Fetch the raw news from the Finlight API (or any other source you are using)
    console.log("Fetching latest news from Finlight...");
    const response = await fetch('https://api.finlight.me/v2/articles', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': 'sk_53d0a1e7ea47688c6853731a43c634617fb34accb4a0ba7dda52e24e278010c6'
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error(`Finlight API returned ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    
    // Format assumption: if it's `{ data: [...] }` or just `[...]`
    const articles = Array.isArray(rawData) ? rawData : rawData.data || rawData.articles || [];
    
    if (articles.length === 0) {
      return NextResponse.json({ message: "No articles found to analyze." });
    }

    // Limit to let's say 5 articles for cost/time control during testing
    const articlesToProcess = articles.slice(0, 5); 
    const processedArticles = [];

    // 2. Loop through and analyze each article
    for (const article of articlesToProcess) {
      // Create a textual representation of the article
      const articleText = `
        Title: ${article.title || 'Unknown Title'}
        Source: ${article.source || 'Unknown Source'}
        Content/Summary: ${article.summary || article.content || article.description || 'No content provided.'}
      `;

      // 3. Check if we already have it to avoid duplicating OpenAI costs
      // Using a hash or simple title match
      const existingQuery = await adminDb.collection('news')
        .where('originalTitle', '==', article.title || 'Unknown Title')
        .limit(1)
        .get();

      if (!existingQuery.empty) {
        console.log(`Article already processed: ${article.title}`);
        continue;
      }

      console.log(`Analyzing: ${article.title}`);
      
      // 4. Generate structured analysis using OpenAI
      try {
        const { object } = await generateObject({
          model: openai('gpt-4o-mini'),
          schema: newsAnalysisSchema,
          prompt: `Analyze the following financial news article and extract the required information.\n\nArticle Data:\n${articleText}`
        });

        const analyzedArticle = {
          ...object,
          originalTitle: article.title || 'Unknown Title',
          originalUrl: article.url || null,
          publishedAt: article.published_at || article.date || new Date().toISOString(),
          analyzedAt: new Date().toISOString()
        };

        // 5. Store in Firebase
        await adminDb.collection('news').add(analyzedArticle);
        
        processedArticles.push(analyzedArticle);
      } catch (aiError) {
         console.error(`Error analyzing article "${article.title}":`, aiError);
         // Continue processing other articles if one fails
      }
    }

    return NextResponse.json({ 
      message: `Successfully analyzed and saved ${processedArticles.length} articles.`,
      articles: processedArticles
    });

  } catch (error: any) {
    console.error("API Error in News Analysis:", error);
    return NextResponse.json(
      { error: 'Failed to analyze news', details: error.message },
      { status: 500 }
    );
  }
}

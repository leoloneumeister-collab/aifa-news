import { NextResponse } from 'next/server';

export async function POST() {
  try {
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

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error fetching news:", error);
    return NextResponse.json(
      { error: 'Failed to fetch news from Finlight APi', details: error.message },
      { status: 500 }
    );
  }
}

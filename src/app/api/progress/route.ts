import { NextRequest, NextResponse } from 'next/server';

// Allowed domains for progress URL proxying
const ALLOWED_HOSTS = [
  'youtube-info-download-api.p.rapidapi.com',
  'p.savenow.to',
];

export async function GET(request: NextRequest) {
  const progressUrl = request.nextUrl.searchParams.get('url');

  if (!progressUrl) {
    return NextResponse.json({ error: 'Missing progress URL' }, { status: 400 });
  }

  // Only allow proxying to expected hosts
  const isAllowed = ALLOWED_HOSTS.some(host => progressUrl.includes(host));
  if (!isAllowed) {
    return NextResponse.json({ error: 'Invalid progress URL' }, { status: 400 });
  }

  try {
    const response = await fetch(progressUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Progress check failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Progress proxy error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

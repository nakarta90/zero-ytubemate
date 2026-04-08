import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '';
const RAPIDAPI_HOST = 'youtube-info-download-api.p.rapidapi.com';

const FORMATS = ['720', '1080', '480', '360', '1440', '4k', 'mp3'];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;

  // Validate video ID format
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video ID' }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format');

  // If format is provided, start a download for that specific format
  if (format) {
    return handleDownload(videoId, format);
  }

  // Otherwise, get video info by requesting a 720p download with add_info=1
  return handleInfo(videoId);
}

async function handleInfo(videoId: string) {
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const apiUrl = new URL(`https://${RAPIDAPI_HOST}/ajax/download.php`);
    apiUrl.searchParams.set('format', '720');
    apiUrl.searchParams.set('url', videoUrl);
    apiUrl.searchParams.set('add_info', '1');

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
      }
      return NextResponse.json({ error: 'unavailable' }, { status: response.status });
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ error: 'unavailable' }, { status: 403 });
    }

    const info = data.additional_info || {};

    const result = {
      title: info.title || data.title || 'Video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      thumbnailFallback: info.thumbnail || data.info?.image || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      channelTitle: info.channel?.name || '',
      lengthSeconds: info.duration || 0,
      durationString: info.durationString || '',
      // Include the initial 720p download progress info
      initialDownload: {
        id: data.id,
        format: '720',
        progressUrl: data.progress_url,
      },
      // Available formats for the user to choose
      availableFormats: [
        { format: '4k', label: '4K (2160p)', type: 'video' },
        { format: '1440', label: '1440p', type: 'video' },
        { format: '1080', label: '1080p', type: 'video' },
        { format: '720', label: '720p', type: 'video' },
        { format: '480', label: '480p', type: 'video' },
        { format: '360', label: '360p', type: 'video' },
        { format: 'mp3', label: 'MP3 Audio', type: 'audio' },
        { format: 'm4a', label: 'M4A Audio', type: 'audio' },
      ],
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

async function handleDownload(videoId: string, format: string) {
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const apiUrl = new URL(`https://${RAPIDAPI_HOST}/ajax/download.php`);
    apiUrl.searchParams.set('format', format);
    apiUrl.searchParams.set('url', videoUrl);
    apiUrl.searchParams.set('add_info', '0');
    if (format === 'mp3') {
      apiUrl.searchParams.set('audio_quality', '320');
    }

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST,
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json({ error: 'rate_limit' }, { status: 429 });
      }
      return NextResponse.json({ error: 'unavailable' }, { status: response.status });
    }

    const data = await response.json();

    if (!data.success) {
      return NextResponse.json({ error: 'unavailable' }, { status: 403 });
    }

    return NextResponse.json({
      id: data.id,
      progressUrl: data.progress_url,
    });
  } catch (error) {
    console.error('API download error:', error);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

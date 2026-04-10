'use client';
import { useEffect, useState, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Download, Film, Music, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

interface VideoData {
  title?: string;
  thumbnail?: string;
  thumbnailFallback?: string;
  channelTitle?: string;
  lengthSeconds?: number;
  durationString?: string;
  initialDownload?: {
    id: string;
    format: string;
    progressUrl: string;
  };
  availableFormats?: Array<{
    format: string;
    label: string;
    type: 'video' | 'audio';
  }>;
}

interface DownloadState {
  status: 'idle' | 'processing' | 'ready' | 'error';
  progress: number;
  downloadUrl: string | null;
}

export default function DownloadPage({ videoId }: { videoId: string }) {
  const t = useTranslations('download');
  const locale = useLocale();
  const [data, setData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [downloads, setDownloads] = useState<Record<string, DownloadState>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/video/${videoId}`);
        if (!res.ok) {
          const err = await res.json();
          if (err.error === 'rate_limit') setError(t('rateLimit'));
          else if (err.error === 'unavailable') setError(t('unavailable'));
          else setError(t('error'));
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError(t('error'));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [videoId, t]);

  const triggerDownload = useCallback((url: string) => {
    // The download URL serves files with Content-Disposition: attachment header,
    // so the browser will download it without navigating away from the page.
    // Using window.location.assign avoids popups entirely.
    window.location.assign(url);
  }, []);

  const pollProgress = useCallback(async (progressUrl: string, format: string) => {
    const maxAttempts = 120; // 2 minutes max
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setDownloads(prev => ({
          ...prev,
          [format]: { status: 'error', progress: 0, downloadUrl: null },
        }));
        return;
      }
      attempts++;

      try {
        // Proxy through our own API to avoid CORS issues
        const proxyUrl = `/api/progress?url=${encodeURIComponent(progressUrl)}`;
        const res = await fetch(proxyUrl);
        const data = await res.json();

        if (data.success === 1 && data.download_url) {
          setDownloads(prev => ({
            ...prev,
            [format]: { status: 'ready', progress: 100, downloadUrl: data.download_url },
          }));
          // Auto-trigger the download
          triggerDownload(data.download_url);
          return;
        }

        const pct = Math.min(Math.round((data.progress / 1000) * 100), 99);
        setDownloads(prev => ({
          ...prev,
          [format]: { status: 'processing', progress: pct, downloadUrl: null },
        }));

        setTimeout(poll, 1500);
      } catch {
        setDownloads(prev => ({
          ...prev,
          [format]: { status: 'error', progress: 0, downloadUrl: null },
        }));
      }
    };

    poll();
  }, [triggerDownload]);

  const startDownload = useCallback(async (format: string) => {
    setDownloads(prev => ({
      ...prev,
      [format]: { status: 'processing', progress: 0, downloadUrl: null },
    }));

    try {
      const res = await fetch(`/api/video/${videoId}?format=${format}`);
      if (!res.ok) {
        setDownloads(prev => ({
          ...prev,
          [format]: { status: 'error', progress: 0, downloadUrl: null },
        }));
        return;
      }

      const result = await res.json();
      if (result.progressUrl) {
        pollProgress(result.progressUrl, format);
      }
    } catch {
      setDownloads(prev => ({
        ...prev,
        [format]: { status: 'error', progress: 0, downloadUrl: null },
      }));
    }
  }, [videoId, pollProgress]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-500">{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-blue-500 hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          {t('backHome')}
        </Link>
      </div>
    );
  }

  const videoFormats = (data?.availableFormats || []).filter(f => f.type === 'video');
  const audioFormats = (data?.availableFormats || []).filter(f => f.type === 'audio');

  const tabs = [
    { id: 'video' as const, label: t('videoTab'), icon: Film },
    { id: 'audio' as const, label: t('audioTab'), icon: Music },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-blue-500 hover:underline flex items-center gap-2 mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" />
        {t('backHome')}
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <img
            src={data?.thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={data?.title || ''}
            className="w-full rounded-xl shadow-lg"
            onError={(e) => {
              const img = e.currentTarget;
              if (data?.thumbnailFallback && img.src !== data.thumbnailFallback) {
                img.src = data.thumbnailFallback;
              } else {
                img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }}
          />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">{data?.title}</h1>
          {data?.channelTitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('channel')}: {data.channelTitle}</p>
          )}
          {data?.durationString && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('duration')}: {data.durationString}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-800">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === id
                ? 'border-blue-500 text-blue-500'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'video' && (
        <div className="space-y-3">
          {videoFormats.map((f) => (
            <FormatRow
              key={f.format}
              label={f.label}
              mimeType="video/mp4"
              downloadState={downloads[f.format]}
              onDownload={() => startDownload(f.format)}
              downloadLabel={t('download')}
            />
          ))}
        </div>
      )}

      {activeTab === 'audio' && (
        <div className="space-y-3">
          {audioFormats.map((f) => (
            <FormatRow
              key={f.format}
              label={f.label}
              mimeType={f.format === 'mp3' ? 'audio/mpeg' : 'audio/m4a'}
              downloadState={downloads[f.format]}
              onDownload={() => startDownload(f.format)}
              downloadLabel={t('download')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FormatRow({
  label,
  mimeType,
  downloadState,
  onDownload,
  downloadLabel,
}: {
  label: string;
  mimeType: string;
  downloadState?: DownloadState;
  onDownload: () => void;
  downloadLabel: string;
}) {
  const status = downloadState?.status || 'idle';
  const progress = downloadState?.progress || 0;
  const downloadUrl = downloadState?.downloadUrl;

  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div>
        <span className="font-semibold">{label}</span>
        <span className="ml-3 text-sm text-gray-500">{mimeType}</span>
      </div>

      {status === 'idle' && (
        <button
          onClick={onDownload}
          className="gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          {downloadLabel}
        </button>
      )}

      {status === 'processing' && (
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progress, 5)}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 w-10">{progress}%</span>
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        </div>
      )}

      {status === 'ready' && downloadUrl && (
        <a
          href={downloadUrl}
          rel="noopener noreferrer"
          className="gradient-bg text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <CheckCircle className="w-4 h-4" />
          {downloadLabel}
        </a>
      )}

      {status === 'error' && (
        <button
          onClick={onDownload}
          className="bg-red-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Retry
        </button>
      )}
    </div>
  );
}

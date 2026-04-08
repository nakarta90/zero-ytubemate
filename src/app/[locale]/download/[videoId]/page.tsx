import { Metadata } from 'next';
import DownloadPage from '@/components/DownloadPage';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

type Props = {
  params: Promise<{ locale: string; videoId: string }>;
};

export default async function Download({ params }: Props) {
  const { videoId } = await params;
  return <DownloadPage videoId={videoId} />;
}

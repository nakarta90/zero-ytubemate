import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import LandingPageContent from '@/components/LandingPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('mp4Title'), description: t('mp4Description') };
}
export default function Mp4Page() { return <LandingPageContent type="mp4" />; }

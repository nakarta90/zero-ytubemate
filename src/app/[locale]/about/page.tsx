import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutPageContent from '@/components/AboutPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('aboutTitle'), description: t('aboutDescription') };
}
export default function AboutPage() { return <AboutPageContent />; }

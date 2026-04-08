import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HowToUsePageContent from '@/components/HowToUsePageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('howToUseTitle'), description: t('howToUseDescription') };
}
export default function HowToUsePage() { return <HowToUsePageContent />; }

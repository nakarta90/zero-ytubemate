import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import PrivacyPageContent from '@/components/PrivacyPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('privacyTitle') };
}
export default function PrivacyPage() { return <PrivacyPageContent />; }

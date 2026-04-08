import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import TermsPageContent from '@/components/TermsPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('termsTitle') };
}
export default function TermsPage() { return <TermsPageContent />; }

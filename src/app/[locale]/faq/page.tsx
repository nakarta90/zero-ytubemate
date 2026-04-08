import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import FAQPageContent from '@/components/FAQPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('faqTitle'), description: t('faqDescription') };
}
export default function FAQPage() { return <FAQPageContent />; }

import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactPageContent from '@/components/ContactPageContent';

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('contactTitle'), description: t('contactDescription') };
}
export default function ContactPage() { return <ContactPageContent />; }

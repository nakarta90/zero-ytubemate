import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FormatsSection from '@/components/FormatsSection';
import FAQSection from '@/components/FAQSection';
import TrustSection from '@/components/TrustSection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FormatsSection />
      <FAQSection />
      <TrustSection />
    </>
  );
}

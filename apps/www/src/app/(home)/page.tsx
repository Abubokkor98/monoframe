import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { ComparisonTable } from '@/components/landing/comparison-table';
import { TechStackSection } from '@/components/landing/tech-stack-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesGrid />
      <ComparisonTable />
      <TechStackSection />
      <CTASection />
      <Footer />
    </>
  );
}

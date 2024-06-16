/* eslint-disable react/no-unescaped-entities */
import Callout from '@/components/home/Callout';
import Features from '@/components/home/Features';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import { getMetadata } from '@/lib/helpers';

export const metadata = getMetadata({
  title: '',
  description: `Easily create unique NFT images with configurable layers and traits with our no-code NFT generator.`,
});

export default function Page() {
  return (
    <div>
      <Hero />
      <Features />
      <Pricing />
      <Callout />
    </div>
  );
}

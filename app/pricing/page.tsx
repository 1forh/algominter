import Pricing from '@/components/home/Pricing';
import { getMetadata } from '@/lib/helpers';

export const metadata = getMetadata({
  title: 'Pricing',
  description: 'Simple no-tricks pricing. You can test out AlgoMinter for free with a limited number of layers and traits. Upgrade to a yearly plan to unlock all features.',
});

export default function Page() {
  return (
    <div>
      <Pricing />
    </div>
  );
}

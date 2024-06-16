import NoMobileWrapper from '@/components/NoMobileWrapper';
import { getMetadata } from '@/lib/helpers';
import TheGenerator from './TheGenerator';

export const metadata = getMetadata({
  title: 'Image Generator',
  description: 'Generate unique images for your NFT collections with AlgoMinter.',
});

export default function Page() {

  return (
    <NoMobileWrapper>
      <TheGenerator />
    </NoMobileWrapper>
  );
}

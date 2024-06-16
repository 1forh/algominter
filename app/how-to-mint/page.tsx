/* eslint-disable react/no-unescaped-entities */
import PageContainer from '@/components/PageContainer';
import { getMetadata } from '@/lib/helpers';
import Link from 'next/link';

export const metadata = getMetadata({
  title: 'How to Mint',
  description: 'Learn how to mint the images you generate with AlgoMinter on the Algorand blockchain.',
});

export default function Page() {
  return (
    <PageContainer>
      <article className='prose mx-auto my-12 md:my-20'>
        <h1>How to Mint</h1>
        <p className='text-lg'>
          Once you have configured, generated, and downloaded your images from AlgoMinter, you'll want to mint them to the Algorand blockchain. There
          are multiple ways to do this. Let's check them out.
        </p>

        <h2>Using AlgoMinter (Coming Soon)</h2>
        <p>
          AlgoMinter will soon have a built-in minting feature that will allow you to mint your images directly from the app. This will be the easiest
          way to mint your images.
        </p>

        <h2>AlgoMinter's Node.js Minting Script</h2>
        <p>
          If you're familiar with Node.js, you can use <Link href='https://github.com/1forh/algominter-mint'>AlgoMinter's Mint Script</Link> to
          mint your images. This script will allow you to mint your images using the Algorand SDK and a <Link href='https://knowledge.pinata.cloud/en/articles/6191471-how-to-create-an-pinata-api-key'>Pinata API key</Link>.
        </p>

        <h2>Thurstober Digital Studios Laboratory</h2>
        <p>
          Check out this awesome{' '}
          <Link href='https://loafpickle.medium.com/algominter-to-lab-conversion-guide-f78c1b6d8bea'>AlgoMinter to Lab Conversion Guide</Link> by{' '}
          <Link href='https://twitter.com/LoafPickle'>LoafPickle</Link> to learn how to mint your generated images using the Thurstober Digital Studios
          Laboratory.
        </p>
      </article>
    </PageContainer>
  );
}

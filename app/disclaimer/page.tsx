/* eslint-disable react/no-unescaped-entities */
import PageContainer from '@/components/PageContainer';
import { getMetadata } from '@/lib/helpers';

export const metadata = getMetadata({
  title: 'Disclaimer',
  description: '',
});

export default function Page() {
  return (
    <PageContainer>
      <article className='prose mx-auto my-12 md:my-20'>
        <h1>Disclaimer for AlgoMinter</h1>
        <h2>General Information</h2>
        <p>
          AlgoMinter provides a platform for users to generate images based on configurable information. The service allows for the personalization of
          content, which is then saved within the local browser database of the user. It is important to note that AlgoMinter is purely a tool for
          creation and storage, not for distribution or sale of generated content.
        </p>
        <h2>No Warranty</h2>
        <p>
          The images generated through AlgoMinter are provided "as is" without any warranties of any kind, either express or implied. AlgoMinter does
          not guarantee that the generated images will meet your expectations or requirements. The use of the service and any reliance you place on
          the generated images are strictly at your own risk. We do not warrant that the service will be uninterrupted, timely, secure, or error-free.
        </p>
        <h2>Intellectual Property Rights</h2>
        <p>
          Users are responsible for ensuring that the content they input to generate images does not infringe upon the intellectual property rights of
          others. AlgoMinter does not claim ownership of the content that users generate.
        </p>
        <h2>Amendments</h2>
        <p>
          AlgoMinter reserves the right to modify this disclaimer at any time, and such modifications shall be effective immediately upon posting of
          the modified disclaimer. Accordingly, you agree to review the disclaimer periodically, and your continued access or use of the AlgoMinter
          site shall be deemed your acceptance of the modified disclaimer.
        </p>
        <h2>Governing Law</h2>
        <p>
          This disclaimer is governed by the laws of your jurisdiction. You hereby consent to the exclusive jurisdiction and venue of courts in your
          jurisdiction in all disputes arising out of or relating to the use of AlgoMinter.
        </p>
        <h2>Contact Us</h2>
        If you have any questions or concerns about this disclaimer, please DM me on X at{' '}
        <a href='https://twitter.com/MinnerAlgo' target='_blank' rel='noreferrer'>
          @MinnerAlgo
        </a>
        .
      </article>
    </PageContainer>
  );
}

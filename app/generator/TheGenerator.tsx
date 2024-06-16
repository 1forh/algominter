'use client';

import Form from '@/components/Form';
import PageContainer from '@/components/PageContainer';
import { useProject } from '@/providers/ProjectProvider';
import StatusIndicator from './StatusIndicator';
import Stepper from './Stepper';
import Configure from './steps/configure/Configure';
import Customize from './steps/customize/Customize';
import Mint from './steps/mint/Mint';
import Preview from './steps/preview/Preview';

type Props = {};

const TheGenerator = (props: Props) => {
  const { form, activeStep } = useProject();

  return (
    <div>
      <div className='mb-8'>
        <PageContainer className="mb-4 flex items-center gap-4">
          <StatusIndicator />
          {/* <DownloadBackupButton /> */}
        </PageContainer>
        <Stepper />
      </div>

      <PageContainer>
        <Form form={form} onSubmit={() => { }}>
          {activeStep === 0 && <Configure />}
          {activeStep === 1 && <Customize />}
          {activeStep === 2 && <Preview />}
          {activeStep === 3 && <Mint />}
        </Form>
      </PageContainer>
    </div>
  );
};

export default TheGenerator;

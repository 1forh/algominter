import Icon, { IconName } from '@/components/Icon';
import PageContainer from '@/components/PageContainer';
import { cn } from '@/lib/cn';
import { useProject } from '@/providers/ProjectProvider';

type Props = {};

const Stepper = (props: Props) => {
  const { activeStep, selectStep, project, previewItems } = useProject();
  const hasSomeTraits = Object.values(project.layers).some((layer) => layer.traits.length > 0);
  const hasSomeItems = previewItems.length > 0;
  const steps = [
    {
      id: 0,
      name: 'Configure',
      icon: 'layerPlus',
      description: 'Setup your layers and traits.',
      active: activeStep === 0,
      onClick: () => selectStep(0),
      disabled: false,
    },
    {
      id: 1,
      name: 'Create Customs',
      icon: 'cog',
      description: 'Define 1/1 NFTs with your traits.',
      active: activeStep === 1,
      onClick: () => selectStep(1),
      disabled: !hasSomeTraits,
    },
    {
      id: 2,
      name: 'Preview',
      icon: 'eye',
      description: 'Generate and preview your images.',
      active: activeStep === 2,
      onClick: () => selectStep(2),
      disabled: !hasSomeTraits,
    },
    {
      id: 3,
      name: 'Download',
      icon: 'fileDownload',
      description: 'Download your generated images.',
      active: activeStep === 3,
      onClick: () => selectStep(3),
      disabled: !hasSomeItems,
    },
  ];

  return (
    <div className='lg:border-b lg:border-t lg:border-gray-700'>
      <PageContainer>
        <nav aria-label='Progress'>
          <ol role='list' className='overflow-hidden rounded-md lg:grid lg:grid-cols-4 lg:rounded-none lg:border-l lg:border-r lg:border-gray-700'>
            {steps.map((step, stepIdx) => (
              <li key={step.id} className='relative overflow-hidden lg:flex-1'>
                <div
                  className={cn(
                    stepIdx === 0 ? 'rounded-t-md border-b-0' : '',
                    stepIdx === steps.length - 1 ? 'rounded-b-md border-t-0' : '',
                    'overflow-hidden border border-gray-700 lg:border-0'
                  )}
                >
                  {step.active ? (
                    <button type='button' aria-current='step' onClick={step.onClick} className='w-full text-left' disabled={step.disabled}>
                      <span className='absolute left-0 top-0 h-full w-1 bg-primary-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full' aria-hidden='true' />
                      <span className={cn(stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-start px-6 py-5 text-sm font-medium')}>
                        <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center'>
                          <Icon name={step.icon as IconName} size='xl' className='text-primary-600' />
                        </span>
                        <span className='ml-4 mt-0.5 flex min-w-0 flex-col'>
                          <span className='text-sm font-medium text-primary-600'>{step.name}</span>
                          <span className='text-sm font-medium text-gray-500'>{step.description}</span>
                        </span>
                      </span>
                    </button>
                  ) : (
                    <button type='button' className='group w-full text-left' onClick={step.onClick} disabled={step.disabled}>
                      <span
                        className='absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-700 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full'
                        aria-hidden='true'
                      />
                      <span className={cn(stepIdx !== 0 ? 'lg:pl-9' : '', 'flex items-start px-6 py-5 text-sm font-medium')}>
                        <span className='flex h-10 w-10 flex-shrink-0 items-center justify-center'>
                          <Icon name={step.icon as IconName} size='xl' className='text-gray-500' />
                        </span>
                        <span className='ml-4 mt-0.5 flex min-w-0 flex-col'>
                          <span className='text-sm font-medium text-gray-500'>{step.name}</span>
                          <span className='text-sm font-medium text-gray-500'>{step.description}</span>
                        </span>
                      </span>
                    </button>
                  )}

                  {stepIdx !== 0 ? (
                    <>
                      {/* Separator */}
                      <div className='absolute inset-0 left-0 top-0 hidden w-3 lg:block' aria-hidden='true'>
                        <svg className='h-full w-full text-gray-700' viewBox='0 0 12 82' fill='none' preserveAspectRatio='none'>
                          <path d='M0.5 0V31L10.5 41L0.5 51V82' stroke='currentcolor' vectorEffect='non-scaling-stroke' />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </PageContainer>
    </div>
  );
};

export default Stepper;

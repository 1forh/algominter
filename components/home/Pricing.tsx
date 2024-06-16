import React from 'react'
import GetAccessButton from '../GetAccessButton'
import { FREE_PLAN_MAX_LAYERS, FREE_PLAN_MAX_TRAITS, PAID_PLAN_PRICE } from '@/config'

type Props = {}

const Pricing = (props: Props) => {
  return (
    <div className='py-24 sm:py-32 relative'>
      <div
        className='absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]'
        aria-hidden='true'
      >
        <div
          className='aspect-[800/800] w-[69.25rem] bg-gradient-to-r from-primary-700 to-primary-100 opacity-30'
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        ></div>
      </div>

      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl sm:text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-50 sm:text-4xl'>Simple no-tricks pricing</h2>
          <p className='mt-6 text-lg leading-8 text-gray-300'>
            You can test out AlgoMinter for free with a limited number of layers and traits. Upgrade to a yearly plan to unlock all features.
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none'>
          <div className='p-8 sm:p-10 lg:flex-auto'>
            <h3 className='text-2xl font-bold tracking-tight text-gray-50'>Yearly Subscription</h3>
            <p className='mt-6 text-base leading-7 text-gray-300'>
              Unlock all features and create unlimited images with AlgoMinter. Pay once a year and get access to all the features we offer.
            </p>
            <div className='mt-10 flex items-center gap-x-4'>
              <h4 className='flex-none text-sm font-semibold leading-6 text-primary-600'>What’s included</h4>
              <div className='h-px flex-auto bg-gray-800'></div>
            </div>
            <ul role='list' className='mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-300 sm:grid-cols-2 sm:gap-6'>
              <li className='flex gap-x-3'>
                <svg className='h-6 w-5 flex-none text-primary-600' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                    clipRule='evenodd'
                  />
                </svg>
                Generate unlimited images
              </li>
              <li className='flex gap-x-3'>
                <svg className='h-6 w-5 flex-none text-primary-600' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                    clipRule='evenodd'
                  />
                </svg>
                Images are downloadable without watermark
              </li>
              <li className='flex gap-x-3'>
                <svg className='h-6 w-5 flex-none text-primary-600' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                    clipRule='evenodd'
                  />
                </svg>
                Create more than {FREE_PLAN_MAX_LAYERS} layers and {FREE_PLAN_MAX_TRAITS} traits
              </li>
              <li className='flex gap-x-3'>
                <svg className='h-6 w-5 flex-none text-primary-600' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                    clipRule='evenodd'
                  />
                </svg>
                Use alternative images for traits
              </li>
            </ul>
          </div>
          <div className='-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0'>
            <div className='rounded-2xl bg-gray-900 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-24'>
              <div className='mx-auto max-w-xs px-8'>
                <p className='text-base font-semibold text-gray-300'>Pay once a year</p>
                <p className='mt-6 flex items-baseline justify-center gap-x-2'>
                  <span className='text-5xl font-bold tracking-tight text-gray-50'>{PAID_PLAN_PRICE}</span>
                  <span className='text-sm font-semibold leading-6 tracking-wide text-gray-300'>ALGO</span>
                </p>
                <div className="mt-8">
                  <GetAccessButton />
                </div>
                {/* <p className='mt-6 text-xs leading-5 text-gray-300'>Some text goes here</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pricing
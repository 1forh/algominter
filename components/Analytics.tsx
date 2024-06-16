'use client';

import { GoogleAnalytics } from 'nextjs-google-analytics';
import React from 'react';

type Props = {};

const Analytics = (props: Props) => {
  return (
    <>
      <GoogleAnalytics trackPageViews />
    </>
  );
};

export default Analytics;

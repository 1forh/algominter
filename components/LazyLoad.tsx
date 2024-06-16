import { useInView, motion } from 'framer-motion';
import React, { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  offset?: string;
};

const LazyLoad = ({ children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: '-150px 0px',
    once: true,
  });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} ref={ref}>
      {isInView ? children : null}
    </motion.div>
  );
};

export default LazyLoad;

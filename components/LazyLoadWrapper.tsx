'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type Props = {
  delayAnimation?: number;
  className?: string;
  children: React.ReactNode;
};

const LazyLoadWrapper: React.FC<Props> = ({ children, className, delayAnimation }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inViewport, setInViewport] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInViewport(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  if (!inViewport) {
    return <div ref={ref} />;
  }

  return (
    <div ref={ref}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className={className}>
        {children}
      </motion.div>
    </div>
  );
};

export default LazyLoadWrapper;

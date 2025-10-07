import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({ children, className, duration = 0.6 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    transition={{ duration, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

interface StaggeredFadeInProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({ children, className, stagger = 0.1 }) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
    variants={{
      visible: {
        transition: {
          staggerChildren: stagger,
        },
      },
    }}
  >
    {children}
  </motion.div>
);

interface FadeInItemProps {
  children: React.ReactNode;
  className?: string;
}

export const FadeInItem: React.FC<FadeInItemProps> = ({ children, className }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }}
  >
    {children}
  </motion.div>
);
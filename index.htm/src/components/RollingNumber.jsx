import { useEffect, useRef } from 'react';
import { useSpring, useTransform, motion } from 'framer-motion';

export function RollingNumber({ value, prefix = '', suffix = '' }) {
  const spring = useSpring(value, {
    mass: 1,
    stiffness: 75,
    damping: 15
  });
  
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const display = useTransform(spring, (current) => {
    return `${prefix}${Math.floor(current).toLocaleString()}${suffix}`;
  });

  return <motion.span>{display}</motion.span>;
}

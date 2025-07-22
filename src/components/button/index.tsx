'use client';

import { motion, MotionProps } from 'framer-motion';
import './styles.scss';

interface ButtonProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function Button({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <motion.button
      className={`btn ${className} ${variant}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      variants={buttonVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
} 
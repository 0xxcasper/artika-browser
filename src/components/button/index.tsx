'use client';

import { motion, MotionProps } from 'framer-motion';
import Link from 'next/link';
import './styles.scss';

interface ButtonProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  href?: string;
}

export default function Button({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  variant = 'primary',
  href,
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

  const buttonContent = (
    <motion.div
      className={`btn ${className} ${variant}`}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      variants={buttonVariants}
      {...props}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
        {buttonContent}
      </Link>
    );
  }

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
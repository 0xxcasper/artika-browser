'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import './styles.scss';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

export default function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="language-switcher">
      <span className={`language-label ${isScrolled ? 'scrolled' : 'transparent'}`}>
        Language:
      </span>
      <div className="language-buttons">
        <motion.button
          className={`language-btn ${language === 'en' ? 'active' : isScrolled ? 'inactive-scrolled' : 'inactive-transparent'}`}
          onClick={() => setLanguage('en')}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          EN
        </motion.button>
        <motion.button
          className={`language-btn ${language === 'vi' ? 'active' : isScrolled ? 'inactive-scrolled' : 'inactive-transparent'}`}
          onClick={() => setLanguage('vi')}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          VI
        </motion.button>
      </div>
    </div>
  );
} 
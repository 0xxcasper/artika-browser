'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import './styles.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

const navLinksLeft: NavLink[] = [
  {
    label: 'navigation.stay',
    href: '/'
  },
  {
    label: 'navigation.gallery',
    href: '/gallery'
  },
  // {
  //   label: 'navigation.experiences',
  //   href: '/experiences'
  // },
  // {
  //   label: 'navigation.dine',
  //   href: '/dine'
  // },
  // {
  //   label: 'navigation.wellness',
  //   href: '/wellness'
  // }
];

const navLinksRight: NavLink[] = [
  // {
  //   label: 'navigation.wedding',
  //   href: '/wedding'
  // },
  // {
  //   label: 'navigation.gallery',
  //   href: '/gallery'
  // },
  // {
  //   label: 'navigation.offer',
  //   href: '/offer'
  // }
];

export default function Navigation() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navVariants = {
    initial: { y: -200, opacity: 0 },
    hidden: { y: -200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '-100%', transition: { type: 'tween', duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.4, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  // const renderNavLink = (link: NavLink, onClick?: () => void) => {
  //   const isActive = pathname === link.href && pathname !== '/';
  //   return (
  //     <Link 
  //       href={link.href} 
  //       key={link.label} 
  //       className={`nav-link ${isScrolled ? 'nav-link-scrolled' : 'nav-link-transparent'} ${isActive ? 'active' : ''}`}
  //       onClick={onClick}
  //     >
  //       {t(link.label)}
  //     </Link>
  //   );
  // };

  const renderNavLinkDrawer = (link: NavLink, onClick?: () => void) => {
    const isActive = pathname === link.href && pathname !== '/';
    return (
      <Link href={link.href} key={link.label} className={`nav-link-drawer ${isActive ? 'active' : ''}`} onClick={onClick}>
        {t(link.label)}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        className={`nav ${isScrolled ? 'nav-scrolled' : 'nav-transparent'}`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="nav-container">
          {/* Hamburger menu for mobile */}
          <button
            className={`nav-hamburger ${isScrolled ? 'nav-hamburger-scrolled' : ''}`}
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
          {/* <Flex alignItems="flex-end" gap="2rem" className="nav-links-desktop">
            {navLinksLeft.map((link) => renderNavLink(link))}
          </Flex> */}
          <Link href="/" className="nav-logo" draggable={false}>
            <Image src="/artika.svg" alt="Artika" width={101} height={32} style={{ filter: isScrolled ? 'invert(1)' : 'invert(0)' }} draggable={false} />
          </Link>
          {/* <Flex alignItems="flex-end" gap="2rem" className="nav-links-desktop">
            {navLinksRight.map((link) => renderNavLink(link))}
          </Flex> */}
        </div>
      </motion.nav>
      {/* Sidebar for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="nav-sidebar-overlay"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.aside
              className="nav-sidebar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sidebarVariants}
            >
              <button
                className="nav-sidebar-close"
                aria-label="Close menu"
                onClick={() => setIsSidebarOpen(false)}
              >
                &times;
              </button>
              <div className="nav-sidebar-links">
                {navLinksLeft.map((link) => renderNavLinkDrawer(link, () => setIsSidebarOpen(false)))}
                {navLinksRight.map((link) => renderNavLinkDrawer(link, () => setIsSidebarOpen(false)))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 
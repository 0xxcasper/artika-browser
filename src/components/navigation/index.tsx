'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.scss';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { NavigationMenu, NavigationSub } from '@/locales/types';
import { Flex } from '@chakra-ui/react';
import { usePreloader } from '@/contexts/PreloaderContext';
import { useLanguage } from '@/contexts/LanguageContext';

const navVariants = {
  initial: { y: -200, opacity: 0 },
  hidden: { y: -200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const sidebarVariants = {
  hidden: { x: '-100%' },
  visible: { x: 0, transition: { type: 'tween', duration: 0.3 } },
  exit: { x: '-100%', transition: { type: 'tween', duration: 0.4 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.4, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export default function Navigation() {
  const { language } = useLanguage();
  const { menus, cta } = usePreloader();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [selectedMenu, setSelectedMenu] = useState<NavigationMenu | null>(null);
  const router = useRouter();

  // Helper function to add locale to href
  const getLocalizedHref = (href: string) => {
    if (href === '/') {
      return language === 'vi' ? '/vi' : '/';
    }
    return language === 'vi' ? `/vi${href}` : href;
  };

  // Helper function to switch language
  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname;
    let newPath = '';

    if (newLocale === 'vi') {
      // Switch to Vietnamese
      if (currentPath === '/') {
        newPath = '/vi';
      } else if (currentPath.startsWith('/vi/')) {
        newPath = currentPath; // Already Vietnamese
      } else {
        newPath = `/vi${currentPath}`;
      }
    } else {
      // Switch to English
      if (currentPath === '/vi') {
        newPath = '/';
      } else if (currentPath.startsWith('/vi/')) {
        newPath = currentPath.replace('/vi', '');
      } else {
        newPath = currentPath; // Already English
      }
    }

    router.push(newPath);
    setIsLanguageDropdownOpen(false);
  };

  // Smart path matching logic
  const getActiveMenu = useMemo(() => {
    // First, try to find exact path match
    const exactMatch = menus.find((menu) => {
      if (menu.href === pathname) return true;
      if (menu.subs?.some((sub) => sub.href === pathname)) return true;
      return false;
    });

    if (exactMatch) return exactMatch;

    // Then, try to find partial path match (for nested routes)
    const partialMatch = menus.find((menu) => {
      if (menu.href === '/') return false; // Skip home for partial matching
      if (pathname.startsWith(menu.href)) return true;
      if (menu.subs?.some((sub) => pathname.startsWith(sub.href))) return true;
      return false;
    });

    return partialMatch || null;
  }, [menus, pathname]);

  // Smart text color detection
  const isTextDark = useMemo(() => {
    const darkTextPaths = ['artwalk', 'admin'];
    return darkTextPaths.some((path) => pathname.includes(path));
  }, [pathname]);

  // Smart active state detection
  const isMenuActive = (menu: NavigationMenu): boolean => {
    // Home page special case
    if (menu.href === '/') {
      return pathname === '/';
    }

    // Exact match
    if (menu.href === pathname) return true;

    // Submenu match
    if (menu.subs?.some((sub) => sub.href === pathname)) return true;

    // Partial match for nested routes
    if (pathname.startsWith(menu.href) && menu.href !== '/') return true;

    // Selected menu state
    if (selectedMenu?.label === menu.label) return true;

    return false;
  };

  // Smart submenu active state detection
  const isSubmenuActive = (href: string): boolean => {
    return href === pathname || pathname.startsWith(href);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-select menu based on current path
  useEffect(() => {
    if (getActiveMenu && getActiveMenu.subs) {
      setSelectedMenu(getActiveMenu);
    } else {
      setSelectedMenu(null);
    }
  }, [getActiveMenu]);

  // Handle click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageDropdownOpen]);

  const renderSubMenu = (element: NavigationSub) => {
    const baseHref = `${submenuToShow?.href}${element.href?.startsWith('/') ? '' : '/'}${element.href}`;
    const href = getLocalizedHref(baseHref);
    const isActive = isSubmenuActive(href);

    if (!element.href) {
      return (
        <div key={element.id} className="nav-link-drawer disabled">
          {element.name}
        </div>
      );
    }

    return (
      <Link
        href={href}
        key={element.id}
        className={`nav-link-drawer ${isActive ? 'active' : ''}`}
        onClick={() => {
          setSelectedMenu(null);
          setIsSidebarOpen(false);
        }}
      >
        {element.name}
      </Link>
    );
  };

  const renderMenu = (element: NavigationMenu) => {
    const isActive = isMenuActive(element);

    // Handle disabled menus (no href)
    if (!element.href) {
      return (
        <div key={element.label} className="nav-link-drawer disabled">
          {element.label}
        </div>
      );
    }

    // Handle menus with submenus
    if (element.subs && element.subs.length > 0) {
      return (
        <Flex
          onClick={() => setSelectedMenu(element)}
          flexDirection="row"
          justifyContent="space-between"
          minWidth={{
            base: '140px',
            md: '215px',
          }}
          cursor="pointer"
          alignItems="center"
          key={element.label}
          _hover={{
            opacity: 0.85,
            '.nav-link-drawer': {
              opacity: 0.85,
              color: '#000',
            },
          }}
        >
          <div className={`nav-link-drawer ${isActive ? 'active' : ''}`}>
            {element.label}
          </div>
          <Image
            src="/icons/ic-arrow-right.svg"
            alt="arrow"
            width={7}
            height={7}
            draggable={false}
          />
        </Flex>
      );
    }

    // Handle regular menu items
    return (
      <Link
        href={getLocalizedHref(element.href)}
        key={element.label}
        className={`nav-link-drawer ${isActive ? 'active' : ''}`}
        onClick={() => {
          setSelectedMenu(null);
          setIsSidebarOpen(false);
        }}
      >
        {element.label}
      </Link>
    );
  };

  // Determine which submenu to show
  const submenuToShow = selectedMenu || getActiveMenu;

  return (
    <>
      <motion.nav
        className={`nav ${isScrolled || isTextDark ? 'nav-scrolled' : 'nav-transparent'}`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="nav-container">
          <button
            className={`nav-hamburger ${isScrolled || isTextDark ? 'nav-hamburger-scrolled' : ''}`}
            aria-label="Open menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Image
              src="/icons/menu.svg"
              alt="menu"
              width={24}
              height={24}
              draggable={false}
            />
          </button>
          <Link
            href={getLocalizedHref('/')}
            className="nav-logo"
            draggable={false}
          >
            <Image
              src="/artika.svg"
              alt="Artika"
              width={113}
              height={24}
              style={{
                filter: isScrolled || isTextDark ? 'invert(1)' : 'invert(0)',
              }}
              draggable={false}
            />
          </Link>

          <Flex
            flexDirection="row"
            gap={{
              base: '16px',
              md: '50px',
            }}
            alignItems="center"
            justifyContent="center"
          >
            <div className="language-dropdown" style={{ position: 'relative' }}>
              <Flex
                flexDirection="row"
                gap={{
                  base: '8px',
                  md: '12px',
                }}
                alignItems="center"
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
              >
                <p
                  className={`nav-text ${isScrolled || isTextDark ? 'nav-text-scrolled' : ''}`}
                >
                  {language === 'vi' ? 'Tiếng Việt' : 'English'}
                </p>
                <Image
                  src="/icons/ic-next.svg"
                  alt="arrow"
                  width={10}
                  height={10}
                  draggable={false}
                  style={{
                    transform: `rotate(90deg) ${isLanguageDropdownOpen ? 'rotate(180deg)' : ''}`,
                    transition: 'transform 0.3s ease',
                    filter:
                      isScrolled || isTextDark ? 'invert(0)' : 'invert(1)',
                  }}
                />
              </Flex>

              {isLanguageDropdownOpen && (
                <motion.div
                  className="language-dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0px',
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    minWidth: '120px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="language-option"
                    onClick={() => switchLanguage('en')}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: language === 'en' ? '#64603C' : '#666',
                      fontWeight: language === 'en' ? '600' : '400',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f8f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    English
                  </div>
                  <div
                    className="language-option"
                    onClick={() => switchLanguage('vi')}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: language === 'vi' ? '#64603C' : '#666',
                      fontWeight: language === 'vi' ? '600' : '400',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f8f8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Tiếng Việt
                  </div>
                </motion.div>
              )}
            </div>
            <Link
              href={cta.cta_link}
              target="_blank"
              className={`nav-text ${isScrolled || isTextDark ? 'nav-text-scrolled' : ''}`}
            >
              {cta.cta_label}
            </Link>
          </Flex>
        </div>
      </motion.nav>

      {isSidebarOpen && (
        <AnimatePresence mode="wait">
          <motion.div
            key="overlay"
            className="nav-sidebar-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={() => setIsSidebarOpen(false)}
          />
          <motion.aside
            key="sidebar"
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
              <Image
                src="/icons/ic-close.svg"
                alt="close"
                width={28}
                height={28}
                draggable={false}
              />
            </button>
            <Flex
              flexDirection="row"
              gap={4}
              justifyContent="space-between"
              height="100%"
            >
              <div className="nav-sidebar-links">
                {menus.map((menu) => renderMenu(menu))}
              </div>
              {submenuToShow?.subs && (
                <div className="nav-sidebar-links">
                  {submenuToShow.subs.map((sub) => renderSubMenu(sub))}
                </div>
              )}
            </Flex>
          </motion.aside>
        </AnimatePresence>
      )}
    </>
  );
}

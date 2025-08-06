'use client';
import { Flex, Text, Link, Image } from '@chakra-ui/react';
import './styles.scss';
import NewsletterForm from '@/components/newsletter-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreloader } from '@/contexts/PreloaderContext';

const Footer = () => {
  const { language } = useLanguage();
  const { menus } = usePreloader();

  // Helper function to add locale to href (learned from navigation component)
  const getLocalizedHref = (href: string) => {
    // If href is empty or just whitespace, return empty string to prevent navigation
    if (!href || href.trim() === '') {
      return '';
    }
    
    if (href === '/') {
      return language === 'vi' ? '/vi' : '/';
    }
    return language === 'vi' ? `/vi${href}` : href;
  };

  const renderLink = (params: {title: string, href: string}) => {
    const { title, href } = params;
    const localizedHref = getLocalizedHref(href);
    
    // If href is empty or localizedHref is empty, render as text instead of link
    if (!href || !localizedHref) {
      return (
        <Text key={title} className="description description__text">
          {title} 
        </Text>
      );
    }
    
    return (
      <Link key={title} href={localizedHref} className="description description__link">
        {title} 
      </Link>
    );
  };

  const renderText = (params: {title: string}) => {
    const { title } = params;
    return (
      <Text className="description description__text">{title}</Text>
    );
  };

  return (
    <div className="footer-container">
      <div className="content">  
          <NewsletterForm />        
          <div className="block">
            <Text className="title">
              Contact
            </Text>
            <Flex flexDirection="column" gap={{ base: '16px', md: '26px' }}>
              <div className="box_description">
                {renderText({ title: 'Ta Phi Village' })}
                {renderText({ title: 'Sa Pa District' })}
                {renderText({ title: 'Lao Cai Province' })}
              </div>
              <div className="box_description">
                {renderText({ title: 'info@artikasapa.com' })}
                {renderText({ title: 'artikasapa.com' })}
                {renderText({ title: '+84 8899963616' })}
              </div>  
            </Flex>
          </div>
          <div className="block">
            <Text className="title">
              Artika
            </Text>
            <div className="box_description">
              {menus?.filter((menu) => menu.href !== '/' && !menu.subs?.length).map((menu) => (
                renderLink({ title: menu?.label, href: menu.href })
              ))}
            </div>
          </div>
          {/* <div className="block">
            <Text className="title">Find us on</Text>
            <Flex gap="12px"> 
              <Link href="https://www.facebook.com/artikasapa" className="description description__link">
                <Image src="/icons/ic-instagram.svg" alt="facebook" width="38px" height="38px" />
              </Link>
              <Link href="https://www.facebook.com/artikasapa" className="description description__link">
                <Image src="/icons/ic-facebook.svg" alt="instagram" width="38px" height="38px" />
              </Link>
            </Flex>
          </div> */}
      </div>
      <div className="bottom-footer">
        <div className="bottom-footer__content">
          <div className="bottom-footer__logo">
            <Image src="/ic-logo-name.svg" alt="Artika Logo" width="160px" height="29px" />
          </div>
          <div className="bottom-footer__social">
            <Text className="bottom-footer__social-text">FOLLOW US</Text>
            <div className="bottom-footer__social-icons">
              <Link href="https://www.instagram.com/artikasapa" className="social-icon">
                <Image src="/icons/ic-instagram.svg" alt="Instagram" width="24px" height="24px" />
              </Link>
              <Link href="https://www.facebook.com/artikasapa" className="social-icon">
                <Image src="/icons/ic-facebook.svg" alt="Facebook" width="24px" height="24px" />
              </Link>
            </div>
          </div>
          <div className="bottom-footer__privacy">
            <Link href="/privacy-policy" className="bottom-footer__privacy-text">
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
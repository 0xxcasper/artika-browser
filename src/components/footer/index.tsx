'use client';
import { Flex, Text, Link, Image } from '@chakra-ui/react';
import './styles.scss';
import NewsletterForm from '@/components/newsletter-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePreloader } from '@/contexts/PreloaderContext';

const Footer = () => {
  const { language } = useLanguage();
  const { menus, footerData } = usePreloader();

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


  return (
    <div className="footer-container">
      <div className="content">  
          <NewsletterForm />        
          <div className="block">
            <Text className="title">
              {footerData.footer_contact_title}
            </Text>
            <Flex flexDirection="column" gap={{ base: '16px', md: '26px' }}>
              <div className="box_description">
                {footerData.footer_contact_address.map((address, index) => (
                  <Text key={index} className="description description__text">
                    {address.address_line}
                  </Text>
                ))}
              </div>
              <div className="box_description">
                {footerData.footer_contact_info.map((contact, index) => (
                  <Text key={index} className="description description__text">
                    {contact.contact_item}
                  </Text>
                ))}
              </div>  
            </Flex>
          </div>
          <div className="block">
            <Text className="title">
              {footerData.footer_artika_title}
            </Text>
            <div className="box_description">
              {menus?.filter((menu) => menu.href !== '/' && !menu.subs?.length).map((menu) => (
                renderLink({ title: menu?.label, href: menu.href })
              ))}
            </div>
          </div>
      </div>
      <div className="bottom-footer">
        <div className="bottom-footer__content">
          <div className="bottom-footer__logo">
            <Image src="/ic-logo-name.svg" alt="Artika Logo" width="160px" height="29px" />
          </div>
          <div className="bottom-footer__social">
            <Text className="bottom-footer__social-text">{footerData.footer_social_title}</Text>
            <div className="bottom-footer__social-icons">
              <Link href={footerData.footer_social_links.instagram_url} className="social-icon" isExternal>
                <Image src="/icons/ic-instagram.svg" alt="Instagram" width="24px" height="24px" />
              </Link>
              <Link href={footerData.footer_social_links.facebook_url} className="social-icon" isExternal>
                <Image src="/icons/ic-facebook.svg" alt="Facebook" width="24px" height="24px" />
              </Link>
            </div>
          </div>
          <div className="bottom-footer__privacy">
            <Link href={getLocalizedHref(footerData.footer_privacy_policy.privacy_policy_link)} className="bottom-footer__privacy-text">
              {footerData.footer_privacy_policy.privacy_policy_text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
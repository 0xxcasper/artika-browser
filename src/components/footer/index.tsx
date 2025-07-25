'use client';
import { Flex, Image, Link, Text } from '@chakra-ui/react';
import './styles.scss';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const renderLink = (params: {title: string, href: string}) => {
    const { title, href } = params;
    return (
      <Link key={title} href={href} className="description description__link">
        {title} 
      </Link>
    )
  };

  const renderText = (params: {title: string}) => {
    const { title } = params;
    return (
      <Text className="description description__text">{title}</Text>
    )
  };


  return (
    <div className="footer-container">
      <div className="content">  
          <Image 
            src="/logo.svg" 
            alt="logo" 
            draggable={false}
            width="64px"
            height="64px"
            display={{ base: 'none', lg: 'flex' }}
          />
          {/* <div className="block">
            <Text className="title">
              Artika
            </Text>
            <div className="box_description">
              {(Object.values(t('navigation')) as unknown as {title: string, href: string}[]).map(({ title, href }) => (
                renderLink({ title, href })
              ))}
            </div>
          </div> */}

          <div className="block">
            <Text className="title">
              Contact Us
            </Text>
            <Flex flexDirection="column" gap={{ base: '24px', md: '38px' }}>
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
            <Text className="title">Find us on</Text>
            <Flex gap="12px"> 
              <Link href="https://www.facebook.com/artikasapa" className="description description__link">
                <Image src="/icons/ic-instagram.svg" alt="facebook" width="38px" height="38px" />
              </Link>
              <Link href="https://www.facebook.com/artikasapa" className="description description__link">
                <Image src="/icons/ic-facebook.svg" alt="instagram" width="38px" height="38px" />
              </Link>
            </Flex>
          </div>
      </div>
    </div>
  );
};

export default Footer;
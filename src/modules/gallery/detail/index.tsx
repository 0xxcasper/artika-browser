'use client';
import './styles.scss'; 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const MAX_LENGTH = 1500;

const MOCKUP_TEXT = `Thương nhớ trong tình yêu là khi ái tình chuyển hóa một bản thể, khiến nó trơ trọi đơn độc khi chạm đến giới hạn của mình, kèm theo đó là nỗi khao khát được gắn kết với một bản thể khác để trở thành trọn vẹn. Trạng thái trọn vẹn trong tình yêu không chỉ liên quan đến hai cá thể, mà là cảm giác hòa quyện làm một giữa con người và thế giới. Khi yêu và được yêu, mỗi chúng ta trở thành con cưng của trời và đất.

Nỗi nhớ trong tình yêu dữ dội, có khi đau đớn, bởi đó là nhịp cầu của nỗi khao khát bắc qua vực thẳm, nơi bên này là nỗi hụt hẫng chơi vơi, phía bên kia là cảm giác viên mãn sâu thẳm trong linh hồn. Một trạng thái mâu thuẫn, khi con người vừa yếu đuối bất lực, vừa cảm thấy mình có thể lớn lao và mạnh mẽ nhường nào.

Với Nhịp cầu thương nhớ, tác giả đã không gian hóa những cảm xúc phức tạp qua giai điệu hình thể của người phụ nữ. Khi được đặt để trong không gian núi rừng Tây Bắc, một cách tự nhiên giai điệu của tác phẩm hòa nhịp với mạch lên xuống của núi đồi. Nhưng giai điệu của núi đồi liền lạc vững chắc, tương phản với nhịp điệu từ tác phẩm vốn bị hẫng ở một phía, nơi cơ thể không có điểm nương tựa nào khác ngoài suối tóc. Đôi cánh tay mảnh dẻ gấp lại chơi vơi và đơn độc giữa không trung, chờ đón một sự săn sóc từ người mình thương yêu. Tình yêu là nguồn lực siêu thực, nâng bản thể mong manh hữu hạn lên, hướng về không gian vô tận. Cô gái không đầu căng mình trong không gian như lạc trong tình ý miên man, hoặc có thể là nỗi hụt hẫng vô bờ.

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,`;

function GalleryDetail({ MOCKUP_TEXT }: { MOCKUP_TEXT: string }) {
  const [expanded, setExpanded] = useState(false);
  const showReadMore = MOCKUP_TEXT.length > MAX_LENGTH;

  const displayText = expanded || !showReadMore
    ? MOCKUP_TEXT
    : MOCKUP_TEXT.slice(0, MAX_LENGTH) + '...';

  return (
    <div className="description">
        <motion.p
          key={expanded ? 'expanded' : 'collapsed'}
          className={`description__text${expanded ? ' expanded' : ''}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
        >
          {displayText}
        </motion.p>
      {showReadMore && (
        <button className="read-more-btn" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

const GalleryDetailPage = () => {
  const banners = [
    '/images/collections/detail/test-1.jpg',
    '/images/collections/detail/test-2.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };

  return (
    <div className="gallery-detail-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index}>
              <Image 
                src={banner}
                alt="banner" 
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                aspectRatio={{
                  base: "2/1",
                  xl: "2.2/1",
                }}
                draggable={false}
              />
            </div>
          ))}
        </Slider>
      </motion.div>
      <motion.div
        className="content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      >
        <motion.div
          className="info"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <p className="name">{`The bridge of\nlonging for love`}</p>
          <p className="author">TẠ QUANG BẠO (1941~)</p>
          <p className="material">Thép / Steel</p>
        </motion.div>
        <GalleryDetail MOCKUP_TEXT={MOCKUP_TEXT} />
      </motion.div>
    </div>
  );
};

export default GalleryDetailPage;
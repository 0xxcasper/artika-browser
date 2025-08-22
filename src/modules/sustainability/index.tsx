'use client';

import About from '@/components/about';
import GalleryGrid from '@/components/gallery-grid';
import RowText from '@/components/row-text';
import { Box, Image } from '@chakra-ui/react';

const SustainabilityPage = () => {
  return (
    <Box className="container" maxWidth="1568px" mx="auto">
      <About
        title="Phát triển bền vững"
        description={`Tinh thần phát triển bền vững và định hướng tác động xã hội của Artika
khởi nguồn từ mong muốn kiến tạo trong sự hài hoà với thiên nhiên và văn hoá bản địa,
thông qua các đóng góp dài hạn và có trách nhiệm`}
        button=""
      />
      <Image
        src="/images/home/banner.jpg"
        alt="Sustainability"
        width="100%"
        height="auto"
        objectFit="cover"
      />

      <RowText
        title={`Bảo tồn và\nkhai mở thiên nhiên`}
        description={`Gìn giữ và khai mở nét đẹp tự nhiên là một trong những ưu tiên hàng đầu tại Artika. Các lớp nền đá cổ và hệ thống hang động bị vùi lấp hàng triệu năm được dần phơi lộ sau quá trình đào đất chủ yếu bằng thủ công, giúp giảm thiểu tác động tới cảnh quan xung quanh và tạo điều kiện để tăng cường thảm thực vật bản địa.\n\nHàng vạn cây như tùng, thông, đỗ quyên, anh đào, mận, táo mèo… được trồng bổ sung để làm giàu sinh cảnh núi rừng. Công việc gieo trồng, chăm sóc và bảo tồn này được thực hiện bằng lao động thủ công, với sự tham gia bền bỉ của người dân địa phương.\n\n Hệ thống đường đi bộ bằng đá – với tổng chiều dài hàng chục kilomet – được xây dựng men theo địa hình tự nhiên, giúp giữ nguyên độ dốc và cấu trúc sườn núi, hạn chế tối đa tác động đến hệ sinh thái xung quanh.`}
      />

      <GalleryGrid
        images={[
          '/images/home/banner-1.jpg',
          '/images/home/banner-2.jpg',
          '/images/home/banner.jpg',
        ]}
        gap={24}
      />
    </Box>
  );
};

export default SustainabilityPage;

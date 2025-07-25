interface ICollection {
  title: string;
  description: string;
  image: string;
  material: string;
}

const COLLECTIONS: ICollection[] = [
  {
    title: 'Nhịp cầu thương nhớ',
    description: 'The bridge of longing for love',
    image: '/images/gallery/collections/glr-1.jpg',
    material: "Đồng / Bronze"
  }, {
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-2.jpg',
    material: "Đồng / Bronze"
  }, {
    title: 'Người đàn bà nằm',
    description: 'The reclining woman',
    image: '/images/gallery/collections/glr-3.jpg',
    material: "Thép / Steel"
  }, {
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-4.jpg',
    material: "Đồng / Bronze"
  }, {
    title: 'Ngựa',
    description: 'Horse',
    image: '/images/gallery/collections/glr-5.jpg',
    material: "Thép / Steel"
  }, {
    title: 'Tình yêu',
    description: 'Love',
    image: '/images/gallery/collections/glr-6.jpg',
    material: "Thép / Steel"
  }, {
    title: 'Hơi thở của bậc giác ngộ',
    description: 'Breaths of the awakened',
    image: '/images/gallery/collections/glr-7.jpg',
    material: "Đồng / Bronze"
  }, {
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-8.jpg',
    material: "Đồng / Bronze"
  }, {
    title: 'Người đàn bà nằm',
    description: 'The reclining woman',
    image: '/images/gallery/collections/glr-9.jpg',
    material: "Thép / Steel"
  }
];

export  { COLLECTIONS };
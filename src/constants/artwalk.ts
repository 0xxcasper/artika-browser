import { SubMenuType } from '@/locales/types';

interface ICollection {
  id: string;
  title: string;
  description: string;
  image: string;
  material: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const COLLECTIONS: ICollection[] = [
  {
    id: slugify('The bridge of longing for love'),
    title: 'Nhịp cầu thương nhớ',
    description: 'The bridge of longing for love',
    image: '/images/gallery/collections/glr-1.jpg',
    material: 'Đồng / Bronze',
  },
  {
    id: slugify('Untitled-1'),
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-2.jpg',
    material: 'Đồng / Bronze',
  },
  {
    id: slugify('The reclining woman'),
    title: 'Người đàn bà nằm',
    description: 'The reclining woman',
    image: '/images/gallery/collections/glr-3.jpg',
    material: 'Thép / Steel',
  },
  {
    id: slugify('Untitled-2'),
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-4.jpg',
    material: 'Đồng / Bronze',
  },
  {
    id: slugify('Horse'),
    title: 'Ngựa',
    description: 'Horse',
    image: '/images/gallery/collections/glr-5.jpg',
    material: 'Thép / Steel',
  },
  {
    id: slugify('Love'),
    title: 'Tình yêu',
    description: 'Love',
    image: '/images/gallery/collections/glr-6.jpg',
    material: 'Thép / Steel',
  },
  {
    id: slugify('Breaths of the awakened'),
    title: 'Hơi thở của bậc giác ngộ',
    description: 'Breaths of the awakened',
    image: '/images/gallery/collections/glr-7.jpg',
    material: 'Đồng / Bronze',
  },
  {
    id: slugify('Untitled'),
    title: 'Vô đề',
    description: 'Untitled',
    image: '/images/gallery/collections/glr-8.jpg',
    material: 'Đồng / Bronze',
  },
  {
    id: slugify('The reclining woman'),
    title: 'Người đàn bà nằm',
    description: 'The reclining woman',
    image: '/images/gallery/collections/glr-9.jpg',
    material: 'Thép / Steel',
  },
];

const ARTWALK_COLLECTION = {
  [SubMenuType.outdoor]: {
    title: 'Discover Art, Discover Yourself.',
    description:
      'Discover our diverse collection of art, from timeless classics to contemporary pieces. Each work offers a unique story and invites you to see the world differently.',
    collections: COLLECTIONS,
  },
  [SubMenuType.personal]: {
    collections: COLLECTIONS,
  },
  [SubMenuType.artists]: {
    collections: COLLECTIONS,
  },
  [SubMenuType.memories]: {
    collections: COLLECTIONS,
  },
  [SubMenuType.whispers]: {
    collections: COLLECTIONS,
  },
  [SubMenuType.voices]: {
    collections: COLLECTIONS,
  },
  [SubMenuType.breathing]: {
    collections: COLLECTIONS,
  },
};

export { ARTWALK_COLLECTION };

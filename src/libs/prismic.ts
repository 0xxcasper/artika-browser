import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';

// Link resolver for collection documents
export function linkResolver(doc: any) {
  if (doc.type === 'collection') {
    return `/artwalk/${doc.data.slugId}`;
  }
  if (doc.type === 'content_item') {
    return `/artwalk/content/${doc.uid}`;
  }
  if (doc.type === 'detail') {
    return `/artwalk/detail/${doc.uid}`;
  }
  return '/';
}

export function createClient(config?: prismicNext.CreateClientConfig) {
  const client = prismic.createClient(repositoryName, {
    routes: [
      {
        type: 'homepage',
        path: '/',
      },
      {
        type: 'homepage',
        path: '/en',
        lang: 'en-us',
      },
      {
        type: 'homepage',
        path: '/vi',
        lang: 'vi',
      },
      {
        type: 'navigation_menu',
        path: '/navigation',
      },
      {
        type: 'navigation_menu',
        path: '/en/navigation',
        lang: 'en-us',
      },
      {
        type: 'navigation_menu',
        path: '/vi/navigation',
        lang: 'vi',
      },
      {
        type: 'collection',
        path: '/artwalk/:uid',
      },
      {
        type: 'collection',
        path: '/en/artwalk/:uid',
        lang: 'en-us',
      },
      {
        type: 'collection',
        path: '/vi/artwalk/:uid',
        lang: 'vi',
      },
      {
        type: 'content_item',
        path: '/artwalk/content/:uid',
      },
      {
        type: 'content_item',
        path: '/en/artwalk/content/:uid',
        lang: 'en-us',
      },
      {
        type: 'content_item',
        path: '/vi/artwalk/content/:uid',
        lang: 'vi',
      },
      {
        type: 'detail',
        path: '/artwalk/detail/:uid',
      },
      {
        type: 'detail',
        path: '/en/artwalk/detail/:uid',
        lang: 'en-us',
      },
      {
        type: 'detail',
        path: '/vi/artwalk/detail/:uid',
        lang: 'vi',
      },
    ],
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
}

export type HomepageDocument = prismic.PrismicDocumentWithUID<{
  hero_title: prismic.TitleField;
  hero_subtitle: prismic.RichTextField;
  hero_background_image: prismic.ImageField;
  hero_logo: prismic.ImageField;
  about_title: prismic.TitleField;
  about_description: prismic.RichTextField;
  about_button_text: prismic.KeyTextField;
  about_button_link: prismic.KeyTextField;
  focus_title: prismic.TitleField;
  focus_description: prismic.RichTextField;
  focus_button_text: prismic.KeyTextField;
  focus_button_link: prismic.KeyTextField;
  focus_background_image: prismic.ImageField;
  focus_aspect_ratio: prismic.KeyTextField;
  split_banner_sections: prismic.GroupField<{
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
    cta_text: prismic.KeyTextField;
    cta_link: prismic.KeyTextField;
    image: prismic.ImageField;
    image_alt: prismic.KeyTextField;
  }>;
  grid_images_title: prismic.KeyTextField;
  grid_images_items: prismic.GroupField<{
    image: prismic.ImageField;
    image_alt: prismic.KeyTextField;
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
  }>;
}>;

export type NavigationMenuDocument = prismic.PrismicDocumentWithUID<{
  items: prismic.GroupField<{
    label: prismic.KeyTextField;
    href: prismic.KeyTextField;
    subs: prismic.GroupField<{
      id: prismic.KeyTextField;
      name: prismic.KeyTextField;
      href: prismic.KeyTextField;
    }>;
  }>;
}>;

export type CollectionDocument = prismic.PrismicDocumentWithUID<{
  slugId: prismic.KeyTextField;
  title: prismic.KeyTextField;
  description: prismic.KeyTextField;
  contents: prismic.GroupField<{
    contentItem: prismic.LinkField;
  }>;
}>;

export type ContentItemDocument = prismic.PrismicDocumentWithUID<{
  name: prismic.KeyTextField;
  subName: prismic.KeyTextField;
  thumb: prismic.ImageField;
  material: prismic.KeyTextField;
  detail: prismic.LinkField;
}>;

export type DetailDocument = prismic.PrismicDocumentWithUID<{
  title: prismic.KeyTextField;
  description: prismic.KeyTextField;
  info: prismic.KeyTextField;
  author: prismic.KeyTextField;
  images: prismic.GroupField<{
    image: prismic.ImageField;
  }>;
}>; 
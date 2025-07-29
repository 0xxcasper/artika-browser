import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';

console.log(process.env.PRISMIC_REPOSITORY_NAME);

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
        lang: 'vi-vn',
      },
      {
        type: 'navigation_menu',
        path: '/navigation',
      },
      {
        type: 'artwalk',
        path: '/artwalk/:uid',
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
  focus_title: prismic.TitleField;
  focus_description: prismic.RichTextField;
  focus_button_text: prismic.KeyTextField;
  focus_background_image: prismic.ImageField;
  focus_aspect_ratio: prismic.KeyTextField;
  split_banner_sections: prismic.GroupField<{
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
    cta_text: prismic.KeyTextField;
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

export type NavigationMenuDocument = prismic.PrismicDocument<{
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

export type ArtwalkDocument = prismic.PrismicDocumentWithUID<{
  title: prismic.KeyTextField;
  description: prismic.KeyTextField;
  material: prismic.KeyTextField;
  image: prismic.ImageField;
  category: prismic.SelectField;
}>; 
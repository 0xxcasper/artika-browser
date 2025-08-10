import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

export const repositoryName =
  process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';

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
  if (doc.type === 'offers_page') {
    return `/offers`;
  }
  if (doc.type === 'offer_item') {
    return `/offers/${doc.uid}`;
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
      // Offers routes
      {
        type: 'offers_page',
        path: '/offers',
      },
      {
        type: 'offers_page',
        path: '/en/offers',
        lang: 'en-us',
      },
      {
        type: 'offers_page',
        path: '/vi/offers',
        lang: 'vi',
      },
      {
        type: 'offer_item',
        path: '/offers/:uid',
      },
      {
        type: 'offer_item',
        path: '/en/offers/:uid',
        lang: 'en-us',
      },
      {
        type: 'offer_item',
        path: '/vi/offers/:uid',
        lang: 'vi',
      },
    ],
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? {
            next: {
              tags: ['prismic'],
              revalidate: 60, // Cache 1 minute in production
            },
          }
        : {
            next: {
              revalidate: 60, // Cache 1 minute in development
            },
          },
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

export type ForestBathingDocument = prismic.PrismicDocumentWithUID<{
  hero_title: prismic.TitleField;
  hero_subtitle: prismic.RichTextField;
  hero_background_image: prismic.ImageField;
  hero_logo: prismic.ImageField;
  about_title: prismic.TitleField;
  about_description: prismic.RichTextField;
  about_button_text: prismic.KeyTextField;
  about_button_link: prismic.KeyTextField;
  split_banner_sections: prismic.GroupField<{
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
    cta_text: prismic.KeyTextField;
    cta_link: prismic.KeyTextField;
    image: prismic.ImageField;
    image_alt: prismic.KeyTextField;
  }>;
  focus_title: prismic.TitleField;
  focus_description: prismic.RichTextField;
  focus_button_text: prismic.KeyTextField;
  focus_button_link: prismic.KeyTextField;
  focus_background_image: prismic.ImageField;
  focus_aspect_ratio: prismic.KeyTextField;
  second_split_banner_sections: prismic.GroupField<{
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
    cta_text: prismic.KeyTextField;
    cta_link: prismic.KeyTextField;
    image: prismic.ImageField;
    image_alt: prismic.KeyTextField;
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
  cta_label: prismic.KeyTextField;
  cta_link: prismic.KeyTextField;
  schedule_tour_title: prismic.KeyTextField;
  schedule_tour_description: prismic.RichTextField;
  schedule_tour_phone_placeholder: prismic.KeyTextField;
  schedule_tour_email_placeholder: prismic.KeyTextField;
  schedule_tour_date_placeholder: prismic.KeyTextField;
  schedule_tour_button_text: prismic.KeyTextField;
  schedule_tour_success_message: prismic.KeyTextField;
  schedule_tour_error_message: prismic.KeyTextField;
  schedule_tour_validation_messages: prismic.GroupField<{
    schedule_tour_phone_required: prismic.KeyTextField;
    schedule_tour_email_required: prismic.KeyTextField;
    schedule_tour_date_required: prismic.KeyTextField;
    schedule_tour_phone_invalid: prismic.KeyTextField;
    schedule_tour_email_invalid: prismic.KeyTextField;
    schedule_tour_date_future: prismic.KeyTextField;
  }>;
  newsletter_title: prismic.KeyTextField;
  newsletter_email_placeholder: prismic.KeyTextField;
  newsletter_button_text: prismic.KeyTextField;
  newsletter_success_message: prismic.KeyTextField;
  newsletter_error_message: prismic.KeyTextField;
  newsletter_validation_message: prismic.KeyTextField;
  footer_contact_title: prismic.KeyTextField;
  footer_contact_address: prismic.GroupField<{
    address_line: prismic.KeyTextField;
  }>;
  footer_contact_info: prismic.GroupField<{
    contact_item: prismic.KeyTextField;
  }>;
  footer_artika_title: prismic.KeyTextField;
  footer_social_title: prismic.KeyTextField;
  footer_social_links: prismic.GroupField<{
    instagram_url: prismic.KeyTextField;
    facebook_url: prismic.KeyTextField;
  }>;
  footer_privacy_policy: prismic.GroupField<{
    privacy_policy_text: prismic.KeyTextField;
    privacy_policy_link: prismic.KeyTextField;
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

export type ExperiencesDocument = prismic.PrismicDocumentWithUID<{
  hero_title: prismic.TitleField;
  hero_subtitle: prismic.RichTextField;
  hero_background_image: prismic.ImageField;
  hero_logo: prismic.ImageField;
  about_title: prismic.TitleField;
  about_description: prismic.RichTextField;
  about_button_text: prismic.KeyTextField;
  about_button_link: prismic.KeyTextField;
  split_banner_sections: prismic.GroupField<{
    title: prismic.KeyTextField;
    description: prismic.RichTextField;
    cta_text: prismic.KeyTextField;
    cta_link: prismic.KeyTextField;
    image: prismic.ImageField;
    image_alt: prismic.KeyTextField;
  }>;
  focus_title: prismic.TitleField;
  focus_description: prismic.RichTextField;
  focus_button_text: prismic.KeyTextField;
  focus_button_link: prismic.KeyTextField;
  focus_background_image: prismic.ImageField;
  focus_aspect_ratio: prismic.KeyTextField;
  second_split_banner_sections: prismic.GroupField<{
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

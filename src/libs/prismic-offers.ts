import type { OfferItem, OfferPageData } from '@/types/offer';
import { createClient } from './prismic';
import {
  asImageUrl,
  asLink,
  asText,
  validateAndNormalizeLocale,
} from './prismic-helpers';

// Fallback data when Prismic API fails
const FALLBACK_OFFERS_DATA: OfferPageData = {
  title: 'Special Offers',
  description: 'From special discounts on accommodations to complimentary amenities, our offers are designed to provide you with an unforgettable experience.',
  items: [
    {
      id: 'extended-stay',
      title: 'Extended Stay',
      description: 'Short blurb for the offer. This is fallback content.',
      images: ['/images/home/banner-1.jpg'],
      buttonText: 'View detail',
      buttonHref: '',
      detail: {
        title: 'Extended Stay',
        description: 'Longer description for the offer. Replace with real copy later.',
        utilities: [
          {
            title: 'Inclusions',
            contents: [
              'Daily breakfast at Artika restaurant',
              'Round-trip shared airport transfers',
            ],
          },
        ],
        buttonText: 'Check availability & book',
        buttonHref: '',
        notes: {
          title: 'Helpful Notes',
          contents: [
            'Valid for bookings 10 days in advance',
            'A credit card guarantee is required at the time of booking',
            'Offer is subject to change without notice',
            'Rates are non-refundable and cannot be amended',
            'Offer is subject to room availability and resort policy',
          ],
          buttonText: 'View property map',
          buttonHref: '',
        },
        images: ['/images/home/banner-1.jpg'],
      },
    },
  ],
};

export async function fetchOffersPage(locale: string): Promise<OfferPageData> {
  try {
    const client = createClient();
    const lang = validateAndNormalizeLocale(locale);

    const page = await client
      .getSingle('offers_page' as any, { lang })
      .catch(() => null);
    const itemsDocs = (await client
      .getAllByType('offer_item' as any, {
        lang,
        orderings: {
          field: 'my.offer_item.first_publication_date',
          direction: 'desc',
        },
      })
      .catch(() => [])) as any[];

    const items: OfferItem[] = itemsDocs.map((doc: any) => ({
      id: doc.uid!,
      title: asText(doc.data.title) || '',
      description: asText(doc.data.short_description) || '',
      images: [asImageUrl(doc.data.thumbnail) || '/images/home/banner-1.jpg'],
      buttonText: doc.data.button_text || '',
      buttonHref: asLink(doc.data.button_link) || '',
      detail: {
        title: asText(doc.data.detail_title) || asText(doc.data.title) || '',
        description: asText(doc.data.detail_description) || '',
        utilities:
          (doc.data.utilities || []).map((u: any) => ({
            title: asText(u.title) || '',
            contents: (asText(u.contents) || '')?.split('/').filter(Boolean),
          })) || [],
        buttonText: doc.data.detail_button_text || doc.data.button_text || '',
        buttonHref:
          asLink(doc.data.detail_button_link) || asLink(doc.data.button_link) || '',
        notes: {
          title: asText(doc.data.notes_title) || '',
          contents: (asText(doc.data.notes_contents) || '').split('/').filter(Boolean),
          buttonText: doc.data.notes_button_text || '',
          buttonHref: asLink(doc.data.notes_button_link) || '',
        },
        images:
          (doc.data.images || [])
            .map((i: any) => asImageUrl(i.image))
            .filter(Boolean) || [],
      },
    }));

    return {
      title: page ? asText((page as any).data?.title) || 'Special Offers' : 'Special Offers',
      description: page
        ? asText((page as any).data?.description) || ''
        : FALLBACK_OFFERS_DATA.description,
      items,
    };
  } catch {
    return FALLBACK_OFFERS_DATA;
  }
}

export async function fetchOfferByUid(locale: string, uid: string) {
  try {
    const client = createClient();
    const lang = validateAndNormalizeLocale(locale);
    const doc: any = await client.getByUID('offer_item' as any, uid, { lang });
    const page = await fetchOffersPage(locale);
    return page.items.find((i) => i.id === doc.uid) || null;
  } catch {
    const page = FALLBACK_OFFERS_DATA;
    return page.items.find((i) => i.id === uid) || null;
  }
}



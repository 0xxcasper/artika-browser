import { OFFERS_PAGE_MOCK } from '@/modules/offers/mock';
import type { OfferItem, OfferPageData } from '@/types/offer';
import { createClient } from './prismic';
import {
  asImageUrl,
  asLink,
  asText,
  validateAndNormalizeLocale,
} from './prismic-helpers';

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
            contents: [asText(u.contents) || ''].filter(Boolean),
          })) || [],
        buttonText: doc.data.detail_button_text || doc.data.button_text || '',
        buttonHref:
          asLink(doc.data.detail_button_link) || asLink(doc.data.button_link) || '',
        notes: {
          title: asText(doc.data.notes_title) || '',
          contents: [asText(doc.data.notes_contents) || ''].filter(Boolean),
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
        : OFFERS_PAGE_MOCK.description,
      items,
    };
  } catch {
    return OFFERS_PAGE_MOCK;
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
    const page = OFFERS_PAGE_MOCK;
    return page.items.find((i) => i.id === uid) || null;
  }
}



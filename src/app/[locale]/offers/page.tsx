import { fetchOffersPage } from '@/libs/prismic-offers';
import OffersList from '@/modules/offers/list';

export default async function OffersPage({
  params,
}: {
  params: { locale: 'en' | 'vi' };
}) {
  const data = await fetchOffersPage(params.locale);
  return <OffersList data={data} lang={params.locale} />;
}



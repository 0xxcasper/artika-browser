import { fetchOfferByUid } from '@/libs/prismic-offers';
import OfferDetail from '@/modules/offers/detail';
import { notFound } from 'next/navigation';

export default async function OffersDetailPage({
  params,
}: {
  params: { locale: 'en' | 'vi'; id: string };
}) {
  const item = await fetchOfferByUid(params.locale, params.id);
  if (!item) notFound();
  return <OfferDetail item={item} />;
}

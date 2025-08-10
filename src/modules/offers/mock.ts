import type { OfferPageData } from '@/types/offer';

const img = '/images/home/banner-1.jpg';

export const OFFERS_PAGE_MOCK: OfferPageData = {
  title: 'Special Offers',
  description:
    'From special discounts on accommodations to complimentary amenities, our offers are designed to provide you with an unforgettable experience.',
  items: [
    'extended-stay',
    'early-booking',
    'residence-privileges',
    'flight-on-us',
  ].map((uid, i) => ({
    id: uid,
    title: ['Extended Stay', 'Early Booking', 'Residence Privileges', 'Flight On Us'][i],
    description:
      'Short blurb for the offer. This is mock content and can be updated later.',
    images: [img],
    buttonText: 'View detail',
    buttonHref: '',
    detail: {
      title: ['Extended Stay', 'Early Booking', 'Residence Privileges', 'Flight On Us'][i],
      description:
        'Longer description for the offer. Replace with real copy later.',
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
      images: [img],
    },
  })),
};



export interface OfferDetailNotes {
  title: string;
  contents: string[];
  buttonText?: string;
  buttonHref?: string;
}

export interface OfferDetail {
  title: string;
  description: string;
  utilities: { title: string; contents: string[] }[];
  buttonText?: string;
  buttonHref?: string;
  notes: OfferDetailNotes;
  images: string[];
}

export interface OfferItem {
  id: string; // Use Prismic UID
  title: string;
  description: string;
  images: string[];
  buttonText?: string;
  buttonHref?: string;
  detail: OfferDetail;
}

export interface OfferPageData {
  title: string;
  description: string;
  items: OfferItem[];
}

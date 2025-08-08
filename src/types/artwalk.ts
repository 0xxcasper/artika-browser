// Artwalk Category Types
export interface ArtwalkDetail {
  images: string[];
  title: string;
  info: string;
  author: string;
  description: string;
}

export interface ArtwalkContent {
  id: string;
  href: string;
  name: string;
  subName: string;
  thumb: string;
  material: string;
  detail: ArtwalkDetail;
  otherProjects?: ArtwalkContent[];
}

export interface ArtwalkCategory {
  slugId: string;
  title: string;
  description: string;
  contents: ArtwalkContent[];
}

export type ArtwalkCategoryList = ArtwalkCategory[];

// Legacy interface for backward compatibility
export interface ArtwalkItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  material: string;
  image: string;
  category: string;
}

// Extended interfaces for Prismic integration
export interface PrismicArtwalkItem {
  id: string;
  uid: string;
  title: string;
  description: string;
  material: string;
  image: {
    url: string;
    alt?: string;
  };
  category: string;
  subName?: string;
  detail?: {
    images: string[];
    info: string;
    author: string;
  };
}

// Utility types for API responses
export interface ArtwalkCategoryResponse {
  slug: string;
  category: ArtwalkCategory;
}

export interface ArtwalkDetailResponse {
  slug: string;
  content: ArtwalkContent;
}

// Type guards
export function isArtwalkCategory(obj: any): obj is ArtwalkCategory {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    Array.isArray(obj.contents)
  );
}

export function isArtwalkContent(obj: any): obj is ArtwalkContent {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.href === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.subName === 'string' &&
    typeof obj.thumb === 'string' &&
    typeof obj.material === 'string' &&
    typeof obj.detail === 'object' &&
    obj.detail !== null
  );
}

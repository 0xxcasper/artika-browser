/** Generic API response for Prismic single document routes */
export interface PrismicApiResponse<T = any> {
  data: T;
  id: string;
  uid: string | null;
}

/** Common hero section data extracted from Prismic */
export interface HeroSectionData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  logo: string;
}

/** Common about section data extracted from Prismic */
export interface AboutSectionData {
  title: string;
  description: string;
  button: string;
  buttonLink: string;
}

/** Common focus banner data extracted from Prismic */
export interface FocusBannerData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
  aspectRatio: string;
}

/** Common page sections that most pages share */
export interface CommonPageData {
  hero: HeroSectionData;
  about: AboutSectionData;
}

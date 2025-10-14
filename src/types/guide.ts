export interface GuideData {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    logo: string;
  };

  about: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };

  splitBanner: {
    sections: Array<{
      id: string;
      title: string;
      description: string;
      ctaText: string;
      ctaLink: string;
      image: string;
      imageAlt: string;
      textFirst: boolean;
    }>;
  };

  prepare: {
    title: string;
    items: Array<{
      description: string;
      image: string;
    }>;
  };

  mapSections: Array<{
    title: string;
    description: string;
    link: string;
    image: string;
  }>;

  scheduleTour: {
    title: string;
    description: string;
    subtitle: string;
    subDescription: string;
    form: {
      phonePlaceholder: string;
      emailPlaceholder: string;
      datePlaceholder: string;
      buttonText: string;
    };
    messages: {
      successMessage: string;
      errorMessage: string;
    };
    validation: {
      phoneRequired: string;
      emailRequired: string;
      dateRequired: string;
      phoneInvalid: string;
      emailInvalid: string;
      dateFuture: string;
    };
  };
}

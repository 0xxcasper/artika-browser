const Router = {
  HOME: '/',
  ARTWALK: '/artwalk',
  OFFERS: '/offers',
};

const getArtwalkRouter = (slug: string, locale?: string) => {
  const basePath = `${Router.ARTWALK}/${slug}`;
  return locale === 'vi' ? `/vi${basePath}` : basePath;
};

const getArtwalkDetailRouter = (
  params: { id: string; slug: string },
  locale?: string,
) => {
  const basePath = `${Router.ARTWALK}/${params.slug}/${params.id}`;
  return locale === 'vi' ? `/vi${basePath}` : basePath;
};

const artwalkRouter = {
  getRouter: getArtwalkRouter,
  getDetailRouter: getArtwalkDetailRouter,
};

export { artwalkRouter };

// Offers helpers
const getOffersRouter = (locale?: string) => {
  const basePath = `${Router.OFFERS}`;
  return locale === 'vi' ? `/vi${basePath}` : basePath;
};

const getOfferDetailRouter = (params: { id: string }, locale?: string) => {
  const basePath = `${Router.OFFERS}/${params.id}`;
  return locale === 'vi' ? `/vi${basePath}` : basePath;
};

const offersRouter = {
  getRouter: getOffersRouter,
  getDetailRouter: getOfferDetailRouter,
};

export { artwalkRouter as defaultArtwalkRouter, offersRouter };

export default Router;

const Router = {
  HOME: '/',
  ARTWALK: '/artwalk',
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

export default Router;

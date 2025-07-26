const Router = {
  HOME: '/',
  ARTWALK: '/artwalk',
};

const getArtwalkRouter = (slug: string) => {
  return `${Router.ARTWALK}/${slug}`;
};

const getArtwalkDetailRouter = (params: { id: string, slug: string }) => {
  return `${Router.ARTWALK}/${params.slug}/${params.id}`;
};

const artwalkRouter = {
  getRouter: getArtwalkRouter,
  getDetailRouter: getArtwalkDetailRouter,
};


export {
  artwalkRouter,
};

export default Router;
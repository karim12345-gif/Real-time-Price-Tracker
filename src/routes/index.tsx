const pageRoutes = {
  home: "/home",
  detailsPage: "/detailsPage",
};

const errorRoutes = {
  401: "/401",
  404: "/404",
  500: "/500",
  error: "/error",
};

const routes = {
  ...pageRoutes,
  ...errorRoutes,
};

export default routes;

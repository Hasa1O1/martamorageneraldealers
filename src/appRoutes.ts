export const appRoutes = [
  "home",
  "about",
  "products",
  "gallery",
  "contact",
  "admin",
] as const;

export type AppRoute = (typeof appRoutes)[number];

export type PublicRoute = Exclude<AppRoute, "admin">;

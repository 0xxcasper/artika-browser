import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
// import { config } from "process";
// import config from "../slicemachine.config.js";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || 'artika-sapa';

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.Route[] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "homepage",
    path: "/en",
    lang: "en-us",
  },
  {
    type: "homepage",
    path: "/vi",
    lang: "vi-vn",
  },
  {
    type: "navigation_menu",
    path: "/navigation",
  },
  {
    type: "collection",
    path: "/artwalk/:slugId",
  },
  {
    type: "content_item",
    path: "/artwalk/content/:uid",
  },
  {
    type: "detail",
    path: "/artwalk/detail/:uid",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
};

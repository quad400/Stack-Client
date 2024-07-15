import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: import.meta.env.VITE_PUBLIC_UNSPLASH_APIKEY,
  fetch: fetch,
});

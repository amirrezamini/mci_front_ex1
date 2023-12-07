import { $fetch, type FetchOptions } from "ofetch";
import { defineNuxtPlugin } from "nuxt/app";
import UserModule from "~/repository/modules/user";

interface IApiInstance {
  user: UserModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.API_BASE_URL,
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const modules: IApiInstance = {
    user: new UserModule(apiFetcher),
  };

  return {
    provide: {
      api: modules,
    },
  };
});

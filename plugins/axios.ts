import { Plugin } from "@nuxt/types";

// BUG: This interceptor file isn't working :c
const axiosPlugin: Plugin = ({ app, store, redirect }) => {
  // Update token to bolo using mutation:
  app.$axios.onRequest((config) => {
    // If the user is authenticated with the token:
    const token = app.$cookies.get("token");

    // And that user's token exists (IN THE CORRECT WAY):
    if (token) {
      //Defines the authorization parameter in the header:
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = "application/json";
      config.headers.ContentType = "application/json;charset=UTF-8";
    }
  });

  // Intercepts some error of some request:
  app.$axios.onError((error) => {
    // If there is a 401 error (invalid token):
    if (error.response?.status === 401) {
      // Remove authentication cookie:
      app.$cookies.remove("token");
      // Sets the token to null/empty:
      store.dispatch("auth/update", { token: null });
      // Send it to the login page:
      return redirect("/login");
    }
  });
};

export default axiosPlugin;

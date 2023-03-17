import { Store, ActionTree } from "vuex";
import { initializeStores } from "@/utils/store-accessor";

const initializer = (store: Store<any>) => initializeStores(store);

export const plugins = [initializer];
export * from "@/utils/store-accessor";

const state = () => ({});
type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {
  // Whenever the Nuxt server (in this case the store) is started:
  async nuxtServerInit({ dispatch }) {
    // Saves the authenticated user's token even if he reloads the page:
    dispatch("auth/update"); // moduleName/moduleMethodName
    await dispatch("tasks/show");
  },
};

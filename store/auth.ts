import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios, $cookies } from "@/utils/nuxt-instance";

interface Login {
  login: {
    email: string;
    password: string;
  };
}

interface UpdatePayload {
  token?: string;
}

type Token = string | null;

@Module({ name: "auth", stateFactory: true, namespaced: true })
export default class Auth extends VuexModule {
  private token = null as Token;

  public get $token() {
    return this.token;
  }

  @Mutation
  private UPDATE_TOKEN(token: Token) {
    this.token = token;
  }

  @Action({ rawError: true })
  public async create(payload: Login) {
    const {
      data: { result },
    } = await $axios.$post("/admin/login_json", payload);

    $cookies.set("token", result.access_token, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // It stores the token in the application state with mutation:
    this.context.commit("UPDATE_TOKEN", result.access_token);
  }

  @Action
  // For the user to continue with the auth cookie, even after leaving the page:

  public update(payload: UpdatePayload) {
    // If token exists in cookies:
    const token = payload?.token ? payload.token : $cookies.get("token");
    // Store it, or set it to null:
    this.context.commit("UPDATE_TOKEN", token || null);
  }

  @Action
  // TODO: Check if this is working as it should
  public async destroy() {
// Undo login/authentication:
await $axios.delete("/auth");

    // Delete o cookie do usuário:
    $cookies.remove("token");

    // Atualiza o token pra nulo usando a mutation:
    this.context.commit("UPDATE_TOKEN", null);
  }
}

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { $axios, $cookies } from "@/utils/nuxt-instance";
import { Task } from "@/models";

@Module({ name: "tasks", stateFactory: true, namespaced: true })
export default class Tasks extends VuexModule {
  // Estado de usuário:
  private task = {} as Task;

  // Getter de user:
  get $single() {
    return this.task;
  }

  @Mutation
  UPDATE_TASKS(tasks: Task) {
    this.task = tasks;
  }

  @Action({ rawError: true })
  public async show() {
    /*If the user doesn't have a cookie with just the token
    makes a return (ignores all code below): */
    if (!$cookies.get("token")) return;

    try {
      const token = $cookies.get("token");
      const AuthStr = "Bearer ".concat(token);

      console.log(AuthStr)
      const tasks = await $axios.$get("/admin/house_rules");

      this.context.commit("UPDATE_TASKS", tasks);
    } catch (error) {
      console.log("SHOW ERROR");

      console.log(error);
    }
  }
}

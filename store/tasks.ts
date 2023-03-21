import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { $axios, $cookies } from "@/utils/nuxt-instance";
import { Task } from "@/models";

interface PayloadUpdate {
  house_rules: {
    name: string;
    active: number;
  };
}

@Module({ name: "tasks", stateFactory: true, namespaced: true })
export default class Tasks extends VuexModule {
  // Estado de usuário:
  private task = {} as Task;
  private newTaskName = "" as string;
  private changeActive = 0 as number;

  // Getter de user:
  get $listAll() {
    return this.task;
  }

  @Mutation
  UPDATE_TASKS(tasks: Task) {
    this.task = tasks;
  }

  @Mutation
  UPDATE_NAME_TASKS(name: string) {
    this.newTaskName = name;
  }

  @Mutation
  UPDATE_ACTIVE_TASKS(active: number) {
    this.changeActive = active;
  }

  @Action
  public async updateActiveTask(active: number) {
    this.context.commit("UPDATE_ACTIVE_TASKS", active);
  }

  @Action
  public async updateNameTask(name: string) {
    this.context.commit("UPDATE_NAME_TASKS", name);
  }

  @Action({ rawError: true })
  public async list() {
    /*If the user doesn't have a cookie with just the token
    makes a return (ignores all code below): */
    if (!$cookies.get("token")) return;

    try {
      const { data } = await $axios.$get("/house_rules");
      this.context.commit("UPDATE_TASKS", data.entities);
      return data.entities;
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  public async create(task: string) {
    await $axios.$post("/house_rules", {
      house_rules: {
        name: task,
        active: 1,
      },
    });

    this.context.dispatch("list");
  }

  @Action({ rawError: true })
  public async destroy(id: string) {
    await $axios.$delete(`/house_rules/${id}`);
    this.context.dispatch("list");
  }

  @Action({ rawError: true })
  public async update(id: string) {
    await $axios.$put(`/house_rules/${id}`, {
      house_rules: {
        name: this.newTaskName,
        active: 1,
      },
    });

    this.context.dispatch("list");
  }

  @Action({ rawError: true })
  public async done(id: number) {
    await $axios.$put(`/house_rules/${id}`, {
      house_rules: {
        name: this.newTaskName,
        active: this.changeActive === 1 ? 0 : 1,
      },
    });

    this.context.dispatch("list");
  }
}

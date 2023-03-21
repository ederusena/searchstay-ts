<template>
  <div class="flex items-center justify-center w-full font-sans h-100">
    <div class="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
      <div class="mb-4">
        <div class="flex justify-between">
          <h1 class="text-grey-900">Todo List</h1>
          <button
            class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
            @click.prevent="handleLogout()"
          >
            Logout
          </button>
        </div>
        <div class="flex mt-4">
          <input
            class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-800"
            placeholder="Add Todo"
            v-model="newTask"
          />
          <button
            class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
            @click.prevent="addTask"
          >
            Add
          </button>
        </div>
        <template v-if="error">
          <div>❌ The task can't be empty or less than 4 characters❗ 😵😕</div>
        </template>
      </div>

      <div v-for="task in tasks" :key="task.name">
        <div class="flex items-center mb-4">
          <p class="w-full text-grey-900" :class="task.active ? '' : 'line-through'">
            {{ task.name }}
          </p>
          <button
            class="p-2 ml-4 mr-2 text-green-500 border-2 border-green-500 rounded flex-no-shrink hover:text-white hover:bg-green"
            @click.stop="doneTask(task.id, task.active, task.name)"
          >
            Done
          </button>
          <button
            class="p-2 ml-2 text-red-500 border-2 border-red-500 rounded flex-no-shrink hover:text-white hover:bg-red"
            @click.prevent="removeTask(task.id)"
          >
            Remove
          </button>
          <button
            class="p-2 ml-2 text-gray-500 border-2 border-gray-500 rounded flex-no-shrink hover:text-white hover:bg-red"
            @click="handleModal(task.id, task.name)"
          >
            Edit
          </button>
        </div>
      </div>

      <AppModalOverlay :active="active" @close="active = false">
        <div class="flex">
          <input
            class="w-full px-3 py-2 mr-4 border rounded shadow appearance-none text-grey-800"
            :placeholder="modalName"
            v-model="newNameTask"
          />
          <button
            class="p-2 border-2 rounded flex-no-shrink text-teal border-teal hover:text-white hover:bg-teal"
            @click.prevent="onSubmitUpdate(modalId)"
          >
            Edit
          </button>
        </div>
      </AppModalOverlay>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tasks, auth } from "@/store";
import { Task } from "@/models";
export default Vue.extend({
  name: "IndexPage",
  middleware: "auth",
  data() {
    return {
      tasks: [] as Task[],
      newTask: "",
      error: false,
      active: false,
      newNameTask: "",
      modalId: "",
      modalName: "",
    };
  },
  async mounted() {
    const taskArray = await tasks.list();
    this.tasks = taskArray;
  },
  methods: {
    handleModal(id: string, name: string) {
      this.active = true;
      this.modalId = id;
      this.modalName = name;
    },
    handleLogout() {
      auth.destroy();
      this.$router.push("/login");
    },
    async doneTask(id: number, active: number, name: string) {
      tasks.updateActiveTask(active);
      tasks.updateNameTask(name);

      await tasks.done(id);
      this.$router.go(0);
    },
    async addTask() {
      if (!this.newTask || this.newTask.length < 4) {
        this.error = true;
        return;
      }
      this.error = false;
      await tasks.create(this.newTask);
      this.$router.go(0);
      this.newTask = "";
    },
    async onSubmitUpdate(id: string) {
      try {
        tasks.updateNameTask(this.newNameTask);
        await tasks.update(id);
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
    async removeTask(id: string) {
      await tasks.destroy(id);
      this.$router.go(0);
    },
  },
});
</script>

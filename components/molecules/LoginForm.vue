<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="w-auto h-12 mx-auto"
        src="@/assets/searchandstay.png"
        alt="Workflow"
      />
      <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                v-model="email"
                autocomplete="email"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                v-model="password"
                autocomplete="current-password"
                required
                class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#FB3B11] border border-transparent rounded-md shadow-sm hover:bg-[#ab371c] focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "@/store";

export default Vue.extend({
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        await auth.create({
          login: { email: this.email, password: this.password },
        });

        this.$router.push("/");
      } catch (error) {
        console.log(error);

        this.$notify({
          type: "error",
          text: "❌ Oops.. something went wrong❗ 😵😕",
        });

        // if (response.data.errors[0].message === "required validation failed") {
        //   this.$notify({
        //     type: "error",
        //     text: "❌ Por favor preencha todos os campos corretamente!",
        //   });
        // }
        // if (response.data.errors[0].message === "Invalid user credentials") {
        //   this.$notify({
        //     type: "warn",
        //     text: "⚠ Dados incorretos! 🤨",
        //   });
        // }
      }
    },
  },
});
</script>

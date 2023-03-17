<template>
  <form @submit.prevent="onSubmit">
    <div>
      <BaseInput v-model="email" type="email" placeholder="E-mail" />
    </div>
    <div>
      <BaseInput v-model="password" type="password" placeholder="Senha" />
    </div>

    <BaseButton text="Entrar" />
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { auth } from "@/store";

export default Vue.extend({
  data() {
    return {
      email: "task@searchandstay.com",
      password: "ph37i45K",
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

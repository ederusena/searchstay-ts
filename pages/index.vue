<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    {{ task }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tasks } from '@/store'
export default Vue.extend({
  name: "IndexPage",
  middleware: 'auth',
  data() {
    return {
      task: tasks.$single,
    }
  },
  mounted() {
    tasks.show()
  }
});
</script>

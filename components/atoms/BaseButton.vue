<template>
  <NuxtLink v-if="btnLink" :to="link">{{ text }}</NuxtLink>
  <button v-else @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    link: {
      type: String
    },
    btnLink: {
      default: false,
      type: Boolean
    }
  }
})
</script>
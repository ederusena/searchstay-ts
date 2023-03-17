<template>
  <LoginTemplate />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'blank',
//Allowed access to non-logged/authenticated users:
middleware: 'guest'
})
</script>

<template>
  <input
    :value="value"
    :placeholder="placeholder"
    :type="type"
    @input="updateValue"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    updateValue(event: any) {
      this.$emit('input', event.target.value)
    }
  }
})
</script>

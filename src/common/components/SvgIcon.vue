<template>
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" :color="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  }
})

const symbolId = computed(() => {
  return `#${props.prefix}-${props.name}`
})
</script>

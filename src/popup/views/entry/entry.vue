<template>
  <div class="M-entry">
    <Nav />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import Nav from '@/popup/components/nav/nav.vue'
</script>

<style scoped lang="scss">
.M-entry {
  //
}
</style>

<template>
  <div class="popup-container">
    <h1 @click="startScreenShot">截屏功能</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const startScreenShot = () => {
  chrome.runtime.sendMessage({ message: 'screen-shot' }, response => {
    console.log('响应', response)
  })
}
</script>

<style lang="scss" scoped>
.popup-container {
  border: 1px solid;
}
</style>

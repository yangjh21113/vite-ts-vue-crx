<template>
  <div class="popup-container">
    <h1 @click="showScreenShot">截屏功能</h1>
    <div>截屏结果</div>
    <img :src="imgUrl" />
    <screen-short v-if="screenshotStatus" @destroy-component="destroyComponent" @get-image-data="getImg"></screen-short>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const showScreenShot = () => {
  screenshotStatus.value = true
}

const screenshotStatus = ref<boolean>(false)
// 销毁组件函数
const destroyComponent = function (status: boolean) {
  screenshotStatus.value = status
}
// 获取裁剪区域图片信息
const imgUrl = ref('')
const getImg = function (base64: string) {
  imgUrl.value = base64
  console.log('截图组件传递的图片信息', base64)
}
</script>

<style lang="scss" scoped>
.popup-container {
  border: 1px solid;
}
</style>

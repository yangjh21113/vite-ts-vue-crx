<template>
  <div class="P-home">
    <h1>Home Page</h1>
    {{ store.name }}
    <SvgIcon name="bad" color="red" />
    <SvgIcon name="download" color="red" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/common/components/SvgIcon.vue'
import { useStore } from '@/popup/store'
const store = useStore()
</script>

<style scoped lang="scss">
.P-home {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: linear-gradient(#f48c8d, #f4c58d);
  h1 {
    margin-top: 50px;
    text-align: center;
    color: #fff;
    font-size: 40px;
  }
}
</style>

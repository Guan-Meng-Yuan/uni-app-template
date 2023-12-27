<template>
  <div class="privacy">privacy</div>
  <button @click="test" type="primary">测试</button>
</template>

<script lang="ts" setup>
import { callApi } from '@/request';
// todo 添加隐私权政策
const test = () => {
  callApi('/test',).then((res) => {
  });
};
</script>

<style lang="scss" scoped></style>

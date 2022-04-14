<template>
  <div>
    <h2>首页</h2>
    <el-button type="primary">Primary</el-button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import myRequest from '@/network'

onMounted(() => {
  myRequest
    .get({
      url: '/home/multidata'
    })
    .then((res) => {
      console.log(res)
    })
})
</script>

<style></style>

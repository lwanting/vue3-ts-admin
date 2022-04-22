<template>
  <div class="nav-header">
    <el-icon class="collapse-btn" :size="30" @click="handleCollapseChange()">
      <component :is="isCollapse ? 'expand' : 'fold'" />
    </el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['update:isCollapse'],
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const handleCollapseChange = () => {
      const collapse = !props.isCollapse
      emit('update:isCollapse', collapse)
    }
    return {
      handleCollapseChange
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  .collapse-btn {
    cursor: pointer;
  }
}
</style>

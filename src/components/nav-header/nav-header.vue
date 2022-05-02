<template>
  <div class="nav-header">
    <el-icon class="collapse-btn" :size="30" @click="handleCollapseChange()">
      <component :is="isCollapse ? 'expand' : 'fold'" />
    </el-icon>
    <breadcrumb :breadcrumbs="breadcrumbs" class="breadcrumb" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import breadcrumb from '@/base-ui/breadcrumb/breadcrumb.vue'
import { mapPathToBreadcrumbs } from '@/utils/map-menu'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    breadcrumb
  },
  emits: ['update:isCollapse'],
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()

    const handleCollapseChange = () => {
      const collapse = !props.isCollapse
      emit('update:isCollapse', collapse)
    }

    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })
    return {
      handleCollapseChange,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  align-items: center;
  .collapse-btn {
    cursor: pointer;
  }
  .breadcrumb {
    margin-left: 10px;
  }
}
</style>

<template>
  <div class="nav-menu">
    <section class="logo">
      <img src="~@/assets/img/logo.svg" alt="" />
      <span v-if="!isCollapse" class="title">Vue3+TS</span>
    </section>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="isCollapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="menu in userMenus" :key="menu.id">
        <template v-if="menu.type === 1">
          <el-sub-menu :index="menu.id + ''">
            <template #title>
              <el-icon>
                <component :is="menuIcon(menu.icon)" v-if="menu.icon" />
              </el-icon>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item
              v-for="item in menu.children"
              :key="item.id"
              :index="item.id + ''"
              @click="onChangeMenu(item)"
            >
              <el-icon>
                <component :is="menuIcon(menu.icon)" v-if="menu.icon" />
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        <template v-else-if="menu.type === 2">
          <el-menu-item :index="menu.id + ''" @click="onChangeMenu(menu)">
            <el-icon>
              <component :is="menuIcon(menu.icon)" v-if="menu.icon" />
            </el-icon>
            <span>{{ menu.name }}</span></el-menu-item
          >
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const userMenus = computed(() => store.state.login.userMenus)

    const menuIcon = (icon: string) => {
      return icon.replace('el-icon-', '')
    }
    const onChangeMenu = (menu: any) => {
      router.push({
        path: menu.url ?? '/not-found'
      })
    }
    return {
      userMenus,
      menuIcon,
      onChangeMenu
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: calc(100% - 48px);
  }
}
</style>

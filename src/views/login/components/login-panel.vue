<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <el-button type="text">
            <el-icon :size="16"><user-filled /></el-icon>
            账号登录
          </el-button>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <el-button type="text">
            <el-icon :size="16"><iphone /></el-icon>
            手机登录
          </el-button>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="config">
      <el-checkbox v-model="isSavePassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" size="large" class="login-btn" @click="onLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UserFilled, Iphone } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    UserFilled,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const currentTab = ref('account')
    const isSavePassword = ref(true)

    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const onLogin = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isSavePassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }
    return {
      currentTab,
      isSavePassword,
      accountRef,
      phoneRef,
      onLogin
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 370px;
  .title {
    text-align: center;
  }
  .config {
    display: flex;
    margin-top: 5px;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 5px;
    width: 100%;
  }
}
</style>

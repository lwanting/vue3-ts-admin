<template>
  <div class="login-account">
    <el-form ref="ruleFormRef" :model="account" label-width="70px">
      <el-form-item label="手机号">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="code-wrap">
          <el-input v-model="account.code" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const account = reactive({
      phone: '',
      code: ''
    })

    const loginAction = () => {
      console.log('phone login')
    }

    return {
      account,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-account {
  .code-wrap {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .code-btn {
      margin-left: 10px;
    }
  }
}
</style>

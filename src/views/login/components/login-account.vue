<template>
  <div class="login-account">
    <el-form ref="formRef" :model="account" :rules="rules" label-width="70px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account-config'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    const accountInfo = localCache.getCache('accountInfo')
    const account = reactive({
      name: accountInfo ? accountInfo.name : '',
      password: accountInfo ? accountInfo.password : ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isSavePassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          handleAccountInfo(isSavePassword)
          store.dispatch('login/accountLoginAction', account)
        }
      })
    }
    const handleAccountInfo = (isSavePassword: boolean) => {
      if (isSavePassword) {
        localCache.setCache('accountInfo', account)
      } else {
        localCache.removeCache('accountInfo')
      }
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>

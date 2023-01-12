<template>
  <t-form
    ref="form"
    :class="['item-container', `login-${type}`]"
    :data="formData"
    :rules="FORM_RULES"
    label-width="0"
    @submit="onSubmit"
  >
    <template v-if="type == 'password'">
      <t-form-item name="username">
        <t-input v-model="formData.username" size="large" placeholder="用户名">
          <template #prefix-icon>
            <t-icon name="user" />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input
          v-model="formData.password"
          size="large"
          :type="showPsw ? 'text' : 'password'"
          clearable
          placeholder="密码"
        >
          <template #prefix-icon>
            <t-icon name="lock-on" />
          </template>
          <template #suffix-icon>
            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />
          </template>
        </t-input>
      </t-form-item>
    </template>

    <!-- 扫码登陆 -->
    <template v-else-if="type == 'qrcode'">
      <div class="tip-container">
        <span class="tip">请使用微信扫一扫登录</span>
        <span class="refresh">刷新 <t-icon name="refresh" /> </span>
      </div>
      <qrcode-vue value="" :size="192" level="H" />
    </template>

    <t-form-item v-if="type !== 'qrcode'" class="btn-container">
      <t-button block size="large" type="submit" :loading="logging"> 登录 </t-button>
    </t-form-item>

    <div class="switch-container">
      <span v-if="type !== 'password'" class="tip" @click="switchType('password')">使用账号密码登录</span>
      <span v-if="type !== 'qrcode'" class="tip" @click="switchType('qrcode')">使用微信扫码登录</span>
    </div>
  </t-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import { MessagePlugin } from 'tdesign-vue-next'
import type { FormInstanceFunctions, FormRule } from 'tdesign-vue-next'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const FORM_RULES: Record<string, FormRule[]> = {
  account: [{ required: true, message: '请输入用户名', type: 'error' }],
  password: [{ required: true, message: '请输入密码', type: 'error' }]
}

const type = ref('password')

const form = ref<FormInstanceFunctions>()
const formData = ref({ username: '', password: '' })
const showPsw = ref(false)

const switchType = (val: string) => {
  type.value = val
}

const router = useRouter()
const route = useRoute()

const logging = ref(false)

const onSubmit = ({ validateResult }) => {
  if (validateResult === true) {
    logging.value = true
    userStore
      .login(formData.value)
      .then(() => {
        MessagePlugin.success('登陆成功')
        const redirect = route.query.redirect as string
        const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard'
        router.push(redirectUrl)
      })
      .finally(() => {
        logging.value = false
      })
  }
}
</script>

<style lang="less" scoped>
@import url('../index.less');
</style>

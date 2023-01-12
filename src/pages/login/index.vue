<template>
  <div class="login-wrapper">
    <login-header />

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">登录到</h1>
        <h1 class="title">Kirin KICP</h1>
      </div>

      <login />
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex'
}
</script>
<script setup lang="ts">
import Login from './components/Login.vue'
import LoginHeader from './components/Header.vue'
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>

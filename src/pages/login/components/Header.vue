<template>
  <header class="login-header">
    <logo-full-icon class="logo" height="36px" />
  </header>
</template>

<script setup lang="ts">
import LogoFullIcon from '@/assets/assets-logo-full.svg?component'
</script>

<style lang="less" scoped>
.login-header {
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(5px);
  color: var(--td-text-color-primary);

  .logo {
    width: 188px;
  }
}
</style>

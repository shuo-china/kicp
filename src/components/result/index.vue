<template>
  <div class="result-container">
    <div class="result-bg-img">
      <component :is="dynamicComponent"></component>
    </div>
    <div class="result-title">{{ title }}</div>
    <div class="result-tip">{{ tip }}</div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import Result404Icon from '@/assets/assets-result-404.svg?component'

const props = defineProps({
  bgUrl: String,
  title: String,
  tip: String,
  type: String
})

const dynamicComponent = computed(() => {
  switch (props.type) {
    case '404':
      return Result404Icon

    default:
      return Result404Icon
  }
})
</script>
<style lang="less" scoped>
.result {
  &-link {
    color: var(--td-brand-color);
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: var(--td-brand-color);
    }

    &:active {
      color: var(--td-brand-color);
    }

    &--active {
      color: var(--td-brand-color);
    }

    &:focus {
      text-decoration: none;
    }
  }

  &-container {
    min-height: 400px;
    height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  &-bg-img {
    width: 200px;
    color: var(--td-brand-color);
  }

  &-title {
    font-style: normal;
    margin-top: 8px;
    color: var(--td-text-color-primary);
    font: var(--td-font-title-large);
    font-weight: 500;
  }

  &-tip {
    margin: 8px 0 32px;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);
  }
}
</style>

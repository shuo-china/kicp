import { defineStore } from 'pinia'
import type { TColorSeries } from '@/config/color'
import { COLOR_TOKEN } from '@/config/color'
import STYLE_CONFIG from '@/config/style'
import { store } from '@/store'

const state = {
  ...STYLE_CONFIG,
  colorList: COLOR_TOKEN
}

export type TState = typeof state

export const useSettingStore = defineStore('setting', {
  state: () => state,
  getters: {
    showSidebar: state => state.layout !== 'top',
    showSidebarLogo: state => state.layout === 'side',
    showHeaderLogo: state => state.layout !== 'side',
    displayMode: (state): 'dark' | 'light' => {
      if (state.mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)')
        if (media.matches) {
          return 'dark'
        }
        return 'light'
      }
      return state.mode as 'dark' | 'light'
    }
  },
  actions: {
    async changeMode(mode: 'dark' | 'light' | 'auto') {
      let theme = mode

      if (mode === 'auto') {
        const media = window.matchMedia('(prefers-color-scheme:dark)')
        if (media.matches) {
          theme = 'dark'
        } else {
          theme = 'light'
        }
      }
      const isDarkMode = theme === 'dark'

      document.documentElement.setAttribute('theme-mode', isDarkMode ? 'dark' : '')
    },
    changeBrandTheme(brandTheme: string) {
      document.documentElement.setAttribute('theme-color', brandTheme)
    },
    addColor(payload: TColorSeries) {
      this.colorList = { ...this.colorList, ...payload }
    },
    updateConfig(payload: Partial<TState>) {
      for (const key in payload) {
        if (payload[key] !== undefined) {
          this[key] = payload[key]
        }
        if (key === 'mode') {
          this.changeMode(payload[key])
        }
        if (key === 'brandTheme') {
          this.changeBrandTheme(payload[key])
        }
      }
    }
  }
})

export function getSettingStore() {
  return useSettingStore(store)
}

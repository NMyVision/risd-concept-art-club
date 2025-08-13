import type { App } from 'vue'
import DefaultLayout from './DefaultLayout.vue'

export const useLayouts = {
  install: (app: App): void => {
    // eslint-disable-next-line vue/multi-word-component-names
    app.component('Layout', DefaultLayout)
  }
}

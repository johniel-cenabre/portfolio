import './style.css'
import { themes } from './themes'
import animations from './animations'
import common from './common'
import pages from './pages'
import router from './router'

const App = Vue.createApp({
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    selectTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.updateWindowWidth)
      this.selectTheme(themes[0])
    })
  },
  beforeUnmounted() {
    this.$nextTick(() => {
      window.removeEventListener('resize')
    })
  },
  computed: {
    isLarge: function () {
      return this.windowWidth >= 1200
    }
  }
})

const components = { ...animations, ...common, ...pages }
for (const component in components) {
  App.component(component, components[component])
}

App.use(router).mount('#app')

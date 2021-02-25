import './style.css'
import './themes/dark.css'
import animations from './animations'
import common from './common'
import pages from './pages'
import router from './router'

const App = Vue.createApp({
  data() {
    return {
      theme: 'dark'
    }
  }
})

const components = { ...animations, ...common, ...pages }
for (const component in components) {
  App.component(component, components[component])
}

App.use(router).mount('#app')

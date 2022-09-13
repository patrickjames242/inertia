import Vue from 'vue'
import { router, App, Link, plugin } from '@inertiajs/vue2'

if (!window.location.pathname.startsWith('/plugin/without')) {
  Vue.use(plugin)
}

Vue.component('InertiaLink', Link)

const app = document.getElementById('app')

window.testing = {}
window.testing.Inertia = router
window.testing.vue = new Vue({
  render: (h) =>
    h(App, {
      props: {
        initialPage: window.initialPage,
        resolveComponent: (name) => {
          return import(`./Pages/${name}`).then((module) => module.default)
        },
      },
    }),
  methods: {
    tap: (value, callback) => {
      callback(value)
      return value
    },
  },
}).$mount(app)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/main.css'

import { createApp, ref, watch } from 'vue'
import App from './App.vue'
import router from './router'

// Set default document title
document.title = 'Your Schair Store'

const app = createApp(App)

// Initialize cart from localStorage or empty array
const cart = ref(JSON.parse(localStorage.getItem('cart')) || [])

// Watch cart changes and save to localStorage
watch(
  cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)

app.provide('cart', cart)

app.use(router)

app.mount('#app')

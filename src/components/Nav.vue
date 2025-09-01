<template>
  <ul class="nav">
    <li v-for="nav in navs" :key="nav.id">
      <router-link
        v-if="nav.name === 'Home'"
        to="/"
        :class="{ active: nav.active }"
        @click="handleNavClick(nav.id)"
        ><i class="bi bi-house-door-fill"></i
      ></router-link>
      <router-link
        v-else-if="nav.name === 'Products'"
        to="/products"
        :class="{ active: nav.active }"
        @click="handleNavClick(nav.id)"
        >{{ nav.name }}</router-link
      >
      <router-link
        v-else-if="nav.name === 'About'"
        to="/about"
        :class="{ active: nav.active }"
        @click="handleNavClick(nav.id)"
        >{{ nav.name }}</router-link
      >
      <router-link
        v-else-if="nav.name === 'Contact'"
        to="/contact"
        :class="{ active: nav.active }"
        @click="handleNavClick(nav.id)"
        >{{ nav.name }}</router-link
      >
      <router-link
        v-else-if="nav.name === 'Cart'"
        to="/cart"
        :class="{ active: nav.active }"
        @click="handleNavClick(nav.id)"
        ><i class="bi bi-cart3"></i> {{ nav.name }}</router-link
      >
      <router-link v-else to="/" :class="{ active: nav.active }" @click="handleNavClick(nav.id)">{{
        nav.name
      }}</router-link>
    </li>
  </ul>
</template>
<script setup>
import { navsData } from '@/data/data'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const navs = ref(navsData)

// Computed property to determine which nav item should be active based on current route
const activeNavId = computed(() => {
  const currentPath = route.path

  if (currentPath === '/') return 1 // Home
  if (currentPath === '/products') return 2 // Products
  if (currentPath === '/about') return 3 // About
  if (currentPath === '/contact') return 4 // Contact
  if (currentPath.startsWith('/products/')) return 2 // Product details (still Products)
  if (currentPath === '/cart') return 5 // Cart

  return 1 // Default to Home
})

// Watch for route changes and update active state
watch(
  activeNavId,
  (newActiveId) => {
    navs.value.forEach((nav) => {
      nav.active = nav.id === newActiveId
    })
  },
  { immediate: true },
)

// Handle manual navigation clicks (optional, for immediate feedback)
const handleNavClick = (id) => {
  navs.value.forEach((nav) => {
    nav.active = nav.id === id
  })

  // Emit event to close sidebar
  emit('nav-click')
}

const emit = defineEmits(['nav-click'])
</script>
<style scoped>
.nav {
  display: flex;
}

.nav li {
  list-style: none;
  margin: 0 10px;
}

.nav li a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.125rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.nav li:hover a,
.nav li a.active {
  color: var(--primary);
}

/* Responsive Design for Nav */
@media (max-width: 768px) {
  .nav li a {
    font-size: 0.95rem;
    letter-spacing: 0.1rem;
  }
}

@media (max-width: 576px) {
  .nav li a {
    font-size: 0.9rem;
    letter-spacing: 0.08rem;
  }
}

@media (max-width: 480px) {
  .nav li a {
    font-size: 0.85rem;
    letter-spacing: 0.06rem;
  }
}

@media (max-width: 360px) {
  .nav li a {
    font-size: 0.8rem;
    letter-spacing: 0.05rem;
  }
}
</style>

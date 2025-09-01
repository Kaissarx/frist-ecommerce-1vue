<template>
  <div class="sideBar">
    <a class="menu" :class="{ active: active }" @click.stop.prevent="handleToggleMenu">
      <i class="bi bi-joystick"></i
    ></a>

    <ul class="sci">
      <li v-for="sci in scis" :key="sci.id">
        <a href="#"><i :class="sci.icon"></i></a>
      </li>
    </ul>
  </div>
  <SideMenu :active="active" @close="closeSidebar" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import SideMenu from './SideMenu.vue'

const route = useRoute()
const active = ref(false)

const scis = [
  { id: 1, icon: 'bi bi-telegram' },
  { id: 2, icon: 'bi bi-whatsapp' },
  { id: 3, icon: 'bi bi-github' },
  { id: 4, icon: 'bi bi-linkedin' },
]

// Smart auto-close functionality
const handleToggleMenu = () => {
  active.value = !active.value
}

// Close sidebar function
const closeSidebar = () => {
  active.value = false
}

// Auto-close on route change
watch(
  () => route.path,
  () => {
    if (active.value) {
      active.value = false
    }
  },
)

// Auto-close on click outside
const handleClickOutside = (event) => {
  const sidebar = document.querySelector('.sideBar')
  const sideMenu = document.querySelector('.side-menu')

  if (active.value && sidebar && sideMenu) {
    // Check if click is outside both sidebar and side menu
    if (!sidebar.contains(event.target) && !sideMenu.contains(event.target)) {
      active.value = false
    }
  }
}

// Auto-close on scroll (with debouncing)
let scrollTimeout
const handleScroll = () => {
  if (active.value) {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      active.value = false
    }, 300) // 300ms delay to avoid closing immediately on small scrolls
  }
}

// Auto-close on window resize
const handleResize = () => {
  if (active.value) {
    active.value = false
  }
}

onMounted(() => {
  // Add event listeners
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  // Clean up event listeners
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  clearTimeout(scrollTimeout)
})
</script>

<style scoped>
.sideBar {
  position: fixed;
  width: 5%;
  min-height: 100vh;
  padding: 30px;
  background: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  transition: all 1s;
  z-index: 2000;
}

.menu {
  font-size: 1.6rem;
  color: #000;
  z-index: 2000;
  transition: ease 1s;
}

.menu.active {
  transform: rotateZ(180deg);
}

.sci {
  padding: 0;
  display: inline-flex;
  justify-content: start;
  flex-direction: column;
  gap: 25px;
}

.sci li {
  list-style: none;
}

.sci li a {
  font-size: 1.6rem;
  color: #000;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .sideBar {
    width: 8%;
    padding: 20px 15px;
  }
}

@media (max-width: 768px) {
  .sideBar {
    width: 8%;
    padding: 12px 8px;
  }

  .menu {
    font-size: 1.2rem;
  }

  .sci {
    gap: 15px;
  }

  .sci li a {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .sideBar {
    width: 6%;
    padding: 8px 4px;
  }

  .menu {
    font-size: 1rem;
  }

  .sci {
    gap: 10px;
  }

  .sci li a {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .sideBar {
    width: 5%;
    padding: 6px 2px;
  }

  .menu {
    font-size: 0.9rem;
  }

  .sci {
    gap: 8px;
  }

  .sci li a {
    font-size: 0.9rem;
  }
}
</style>

<template>
  <div class="side-menu" :class="{ active: active }">
    <Nav @nav-click="handleNavClick" />
  </div>
</template>

<script setup>
import Nav from './Nav.vue'

const props = defineProps({
  active: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const handleNavClick = () => {
  // Emit event to parent to close sidebar
  emit('close')
}
</script>

<style>
.side-menu {
  position: fixed;
  left: -300px;
  width: 300px;
  height: 100%;
  padding: 30px;
  background: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  transition: 1s;
  z-index: 999;
}

.side-menu.active {
  left: 0;
}

.side-menu .nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
}

.side-menu .nav li {
  list-style: none;
  margin: 0 10px;
}

.side-menu .nav li a {
  color: #000;
  text-decoration: none;
  font-weight: 600;
  letter-spacing: 0.125rem;
  cursor: pointer;
  transition: 0.3s;
}

.side-menu .nav li:hover a,
.side-menu .nav li a.active {
  color: var(--third);
}

/* Responsive Design for SideMenu */
@media (max-width: 1200px) {
  .side-menu {
    width: 280px;
    padding: 25px;
  }
}

@media (max-width: 991px) {
  .side-menu {
    width: 260px;
    padding: 22px;
  }
}

@media (max-width: 768px) {
  .side-menu {
    width: 65%;
    max-width: 230px;
    padding: 20px;
  }
}

@media (max-width: 576px) {
  .side-menu {
    width: 55%;
    max-width: 200px;
    padding: 18px;
  }

  .side-menu .nav {
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .side-menu {
    width: 50%;
    max-width: 180px;
    padding: 15px;
  }

  .side-menu .nav {
    gap: 18px;
  }
}

@media (max-width: 360px) {
  .side-menu {
    width: 45%;
    max-width: 160px;
    padding: 12px;
  }

  .side-menu .nav {
    gap: 15px;
  }
}
</style>

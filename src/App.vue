<template>
  <!-- Full-Page Loading Screen -->
  <LoadingScreen v-if="isLoading" @loading-complete="handleLoadingComplete" />

  <!-- Main Website Content (Hidden until loading complete) -->
  <div v-else class="website-content">
    <SideBar />
    <Header />
    <main id="main">
      <router-view />
    </main>
    <Footer />
    <CartBtnLoader />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'
import CartBtnLoader from './components/CartBtnLoader.vue'
import LoadingScreen from './components/LoadingScreen.vue'

const isLoading = ref(true)

const handleLoadingComplete = () => {
  isLoading.value = false
}

onMounted(() => {
  // Simulate initial loading time
  // In real app, this would wait for actual resources to load
  setTimeout(() => {
    // The LoadingScreen component will emit 'loading-complete' when ready
  }, 100)
})
</script>

<style scoped></style>

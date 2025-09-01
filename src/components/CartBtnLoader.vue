<template>
  <div class="cart-btn-loader" :class="{ active: scroll > 100 }">
    <CartBtn />
  </div>
</template>
<script setup>
import CartBtn from './CartBtn.vue'
import { onMounted, ref } from 'vue'

const scroll = ref(0)
onMounted(() => {
  window.addEventListener('scroll', () => {
    scroll.value = window.scrollY
  })
})
</script>
<style scoped>
.cart-btn-loader {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background: var(--primary);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  cursor: pointer;
  transition: 0.5s;
}

.cart-btn-loader.active {
  visibility: visible;
  opacity: 1;
}

.cart-btn-loader:hover {
  background: #fe9400;
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .cart-btn-loader {
    height: 80px;
    width: 80px;
    right: 12px;
  }
}

@media (max-width: 576px) {
  .cart-btn-loader {
    height: 70px;
    width: 70px;
    right: 10px;
  }
}

@media (max-width: 480px) {
  .cart-btn-loader {
    height: 60px;
    width: 60px;
    right: 8px;
  }
}

@media (max-width: 360px) {
  .cart-btn-loader {
    height: 55px;
    width: 55px;
    right: 6px;
  }
}
</style>

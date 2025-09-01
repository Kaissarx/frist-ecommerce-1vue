<template>
  <div class="cart-btn">
    <router-link to="/cart" class="cart"><i class="bi bi-cart4"></i></router-link>
    <span class="count">{{ cart.length }}</span>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue'

const cart = ref(inject('cart'))
</script>

<style scoped>
.cart-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.5s;
}

.cart {
  font-size: 30px;
  color: #fff;
}

.count {
  font-size: 1.2rem;
  color: #fff;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background: #00a950;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive Design for Small Screens */
@media (max-width: 768px) {
  .cart {
    font-size: 25px;
  }

  .count {
    font-size: 1rem;
    width: 25px;
    height: 25px;
    padding: 4px;
  }
}

@media (max-width: 576px) {
  .cart {
    font-size: 22px;
  }

  .count {
    font-size: 0.9rem;
    width: 22px;
    height: 22px;
    padding: 3px;
  }
}

@media (max-width: 480px) {
  .cart {
    font-size: 20px;
  }

  .count {
    font-size: 0.8rem;
    width: 20px;
    height: 20px;
    padding: 2px;
  }
}

@media (max-width: 360px) {
  .cart {
    font-size: 18px;
  }

  .count {
    font-size: 0.7rem;
    width: 18px;
    height: 18px;
    padding: 2px;
  }
}
</style>

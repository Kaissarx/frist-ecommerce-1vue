<template>
  <header id="home">
    <RouterLink to="/" class="logo"
      ><img src="../assets/logo1.png" width="100" alt="Syler Logo" />
      <span class="s">S</span>Chair</RouterLink
    >
    <Nav />

    <div class="features">
      <CartBtn />
    </div>
  </header>
</template>

<script setup>
import Nav from './Nav.vue'
import CartBtn from './CartBtn.vue'
</script>

<style scoped>
header {
  position: relative;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px 30px 200px;
  z-index: 1100;
}
.logo {
  font-size: 2.1875rem;
  color: #fff;
  letter-spacing: 0.125rem;
  font-weight: 800;
}

.features {
  display: flex;
  align-items: center;
  gap: 10px;
}
.s {
  color: var(--primary);
  font-size: 3rem;
}

@media (max-width: 991px) {
  /* Center logo on tablets and phones */
  header {
    justify-content: center;
    padding: 20px 50px;
  }

  .logo {
    font-size: 1.8rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: 15px; /* Move logo down a bit */
  }

  .logo img {
    width: 70px;
  }

  .s {
    font-size: 2.5rem;
  }

  .features {
    position: absolute;
    right: 20px;
  }
}

@media (max-width: 768px) {
  header {
    padding: 10px 20px;
  }
  .nav {
    display: none;
  }
  .logo {
    font-size: 1.5rem;
  }
  .logo img {
    width: 60px;
  }
  .s {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  header {
    padding: 10px 15px;
  }
  .logo {
    font-size: 1.2rem;
  }
  .logo img {
    width: 50px;
  }
  .s {
    font-size: 1.5rem;
  }
}
</style>

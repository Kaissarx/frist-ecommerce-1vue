<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- SChair Logo -->
        <div class="footer-logo">
          <img src="../assets/logo1.png" alt="SChair Logo" class="logo-img" />
          <span class="logo-text"> <span class="s">S</span>Chair </span>
        </div>

        <!-- Copyright -->
        <div class="footer-copyright">
          <p>&copy; 2025 Mohamed Abdelrazek. All rights reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed for this simple footer
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);
  padding: 40px 0;
  margin-top: 50px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo-img {
  width: 70px;
  height: auto;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.125rem;
}

.logo-text .s {
  color: var(--primary);
  font-size: 2.2rem;
  font-weight: 900;
}

.footer-copyright {
  color: #ccc;
  font-size: 1rem;
  font-weight: 400;
}

.footer-copyright p {
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer {
    padding: 30px 0;
    margin-top: 30px;
  }

  .footer-content {
    gap: 15px;
  }

  .logo-img {
    width: 55px;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .footer-copyright {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 25px 0;
    margin-top: 25px;
  }

  .logo-img {
    width: 45px;
  }

  .logo-text {
    font-size: 1.3rem;
  }

  .footer-copyright {
    font-size: 0.85rem;
  }
}
</style>

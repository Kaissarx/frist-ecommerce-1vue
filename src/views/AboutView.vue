<template>
  <div class="about-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="about-header text-center">
            <h1 class="display-4 mb-4">About SChair</h1>
            <p class="lead">Your Premier Destination for Quality Gaming-Chairs</p>
          </div>
        </div>
      </div>

      <div class="about-cards-container">
        <div class="about-card mission-card">
          <div class="card-icon">
            <i class="bi bi-award-fill"></i>
          </div>
          <h3>Our Mission</h3>
          <p>
            At SChair, we believe that every gamer deserves to have a space that reflects their
            personality and provides comfort. Our mission is to offer high-quality, stylish gaming
            chairs that transform gaming setups into ultimate gaming stations.
          </p>
        </div>

        <div class="about-card vision-card">
          <div class="card-icon">
            <i class="bi bi-heart-fill"></i>
          </div>
          <h3>Our Vision</h3>
          <p>
            We envision a world where beautiful, functional gaming chairs are accessible to every
            gamer. Through innovative design and exceptional craftsmanship, we create chairs that
            stand the test of time.
          </p>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <div class="about-story">
            <h2 class="text-center mb-4">Our Story</h2>
            <p class="text-center">
              Founded with a passion for design and quality, SChair has been serving gamers since
              2020. What started as a small family business has grown into a trusted name in gaming
              chair retail, known for our commitment to excellence and customer satisfaction.
            </p>
          </div>
        </div>
      </div>

      <div class="features-container">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="bi bi-truck"></i>
          </div>
          <h4>Fast Delivery</h4>
          <p>Quick and reliable shipping to your doorstep</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="bi bi-shield-check"></i>
          </div>
          <h4>Quality Guarantee</h4>
          <p>Premium materials and craftsmanship assured</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="bi bi-headset"></i>
          </div>
          <h4>24/7 Support</h4>
          <p>Always here to help with your questions</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component
</script>

<style scoped>
.about-page {
  padding: 80px 0;
  min-height: 100vh;
  background: #1e1e1e;
  color: #fff;
}

.about-header h1 {
  color: var(--primary);
  font-weight: 700;
}

.about-header .lead {
  color: #ccc;
  font-size: 1.25rem;
}

/* About Cards Container */
.about-cards-container {
  display: flex;
  gap: 30px;
  margin: 3rem 0;
  flex-wrap: wrap;
}

.about-card {
  flex: 1;
  min-width: 300px;
  background: #232323;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.about-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 25px rgba(255, 255, 255, 0.2);
}

.card-icon {
  font-size: 3rem;
  color: var(--primary);
  margin-bottom: 20px;
  text-align: center;
}

.about-card h3 {
  color: var(--primary);
  margin-bottom: 15px;
  font-weight: 600;
  text-align: center;
}

.about-card p {
  color: #ccc;
  line-height: 1.6;
  text-align: center;
}

.about-story {
  background: #232323;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
}

.about-story h2 {
  color: var(--primary);
  font-weight: 600;
}

.about-story p {
  color: #ccc;
  font-size: 1.1rem;
  line-height: 1.8;
}

/* Features Container */
.features-container {
  display: flex;
  gap: 25px;
  margin-top: 3rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-card {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  background: #232323;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
  text-align: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 25px rgba(255, 255, 255, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 20px;
}

.feature-card h4 {
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 15px;
}

.feature-card p {
  color: #ccc;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .about-cards-container {
    gap: 25px;
  }

  .features-container {
    gap: 20px;
  }

  .about-card {
    min-width: 280px;
  }

  .feature-card {
    min-width: 220px;
    max-width: 300px;
  }
}

@media (max-width: 991px) {
  .about-cards-container {
    gap: 20px;
  }

  .features-container {
    gap: 18px;
  }

  .about-card {
    min-width: 250px;
  }

  .feature-card {
    min-width: 200px;
    max-width: 280px;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 40px 0;
  }

  .about-header h1 {
    font-size: 2.5rem;
  }

  .about-cards-container {
    flex-direction: column;
    gap: 20px;
    margin: 2rem 0;
  }

  .features-container {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 2rem;
  }

  .about-card,
  .feature-card {
    padding: 20px;
    min-width: 100%;
    max-width: 100%;
  }

  .about-card {
    min-width: 100%;
  }
}

@media (max-width: 576px) {
  .about-cards-container {
    gap: 15px;
    margin: 1.5rem 0;
  }

  .features-container {
    gap: 15px;
    margin-top: 1.5rem;
  }

  .about-card,
  .feature-card {
    padding: 18px;
  }

  .about-story {
    padding: 25px;
  }

  .card-icon {
    font-size: 2.5rem;
  }

  .feature-icon {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .about-card,
  .feature-card {
    padding: 15px;
  }

  .about-story {
    padding: 20px;
  }

  .card-icon {
    font-size: 2rem;
  }

  .feature-icon {
    font-size: 1.8rem;
  }

  .about-card h3 {
    font-size: 1.2rem;
  }

  .feature-card h4 {
    font-size: 1.1rem;
  }
}
</style>

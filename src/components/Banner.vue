<template>
  <div class="banner">
    <!-- Banner Slides Section -->
    <div class="banner-slides-container">
      <div
        v-for="item in items"
        :key="item.id"
        class="banner-slide"
        :class="{ active: item.active }"
      >
        <div class="content">
          <h1>{{ item.name }}</h1>
          <p>{{ item.brief }}</p>
          <div class="colors">
            <h4>color</h4>
            <div class="color-list">
              <span
                v-for="color in item.colors"
                :key="color.id"
                :style="{ background: color.color }"
                :class="{ active: color.active }"
              ></span>
            </div>
          </div>
          <div class="pricing">
            <router-link :to="`/products/${item.id}`" class="add-to-cart">Learn More</router-link>
            <span
              class="price"
              :style="[
                item.discount !== 0 && {
                  textDecoration: 'line-through',
                  textDecorationColor: 'red',
                  fontSize: '1.2rem',
                },
              ]"
              >${{ item.price.toLocaleString() }}</span
            >
            <span class="price" v-if="item.discount !== 0"
              >${{ (item.price * (1 - item.discount)).toFixed(0) }}</span
            >
          </div>
        </div>
        <div class="item-img">
          <div
            class="img-container"
            :class="{ active: item.active }"
            :style="{ background: item.bgColor }"
          >
            <img :src="item.imgUrl" :alt="item.name" />
          </div>
        </div>
      </div>
    </div>

    <!-- Banner Swiper Section -->
    <div class="banner-swiper-container">
      <swiper
        :slidesPerView="getSlidesPerView()"
        :spaceBetween="getSpaceBetween()"
        :navigation="true"
        :modules="modules"
        class="banner-swiper"
      >
        <SwiperSlide v-for="item in items.slice(0, 5)" :key="item.id">
          <img :src="item.imgUrl" :alt="item.name" @click="handleBannerChange(item.id)" />
        </SwiperSlide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'

const items = ref([])

onMounted(() => {
  fetch('https://schai-data.vercel.app/api/items')
    .then((res) => res.json())
    .then((data) => (items.value = data))
    .catch((e) => console.log(e.message))
})

const handleBannerChange = (id) => {
  items.value.map((item) => {
    item.active = false
    if (item.id === id) item.active = true
    return item
  })
}

// Responsive functions for swiper
const getSlidesPerView = () => {
  if (window.innerWidth <= 576) return 3
  if (window.innerWidth <= 768) return 3
  if (window.innerWidth <= 991) return 3
  if (window.innerWidth <= 1200) return 3
  return 3
}

const getSpaceBetween = () => {
  if (window.innerWidth <= 576) return 5
  if (window.innerWidth <= 768) return 8
  if (window.innerWidth <= 991) return 15
  if (window.innerWidth <= 1200) return 20
  return 30
}

const modules = [Navigation]
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  background: var(--bgColor);
  display: flex;
  flex-direction: column;
}

/* Banner Slides Container */
.banner-slides-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.banner-slide {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  transition: all 1s;
  opacity: 0;
  visibility: hidden;
  transform: scale(0);
}

.banner-slide.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.content {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px 0 200px;
}

.content h1 {
  color: #fff;
  font-size: 5rem;
}

.content p {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 50px;
}

.content .colors {
  display: inline-flex;
  gap: 50px;
  align-items: center;
  margin-bottom: 50px;
}

.content .colors h4 {
  color: #fff;
  text-transform: uppercase;
}

.content .colors .color-list {
  display: flex;
  gap: 20px;
}

.content .colors .color-list span {
  padding: 10px;
  content: '';
  border: 5px solid #fff;
  border-radius: 50%;
  transition: all 0.3s;
}

.content .colors .color-list span:hover,
.content .colors .color-list span.active {
  box-shadow: 0px 0 20px rgba(253, 184, 44, 0.8);
}

.content .pricing {
  display: inline-flex;
  align-items: center;
  gap: 40px;
}

.content .pricing .add-to-cart {
  color: #000;
  background: white;
  padding: 20px 40px;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer !important;
}

.content .pricing .price {
  color: var(--primary);
  font-size: 2.8rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.item-img {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-img .img-container {
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: var(--primary);
  transform: rotateZ(180deg);
  transition: all 1s ease-in-out;
}

.item-img .img-container.active {
  transform: rotateZ(0);
}

.item-img .img-container::before {
  position: absolute;
  content: '';
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  border-radius: 50%;
  border: 5px solid #414141;
}

.item-img .img-container img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 800px;
  object-fit: cover;
}

/* Banner Swiper Container */
.banner-swiper-container {
  height: 240px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.1);
}

.banner-swiper {
  width: 100%;
  height: 100%;
  max-width: 600px;
}

/* Swiper Styles */
:deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
}

:deep(.swiper-slide img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

:deep(.swiper-slide:hover img) {
  transform: scale(1.05);
}

:deep(.swiper .swiper-button-prev),
:deep(.swiper .swiper-button-next) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
}

:deep(.swiper .swiper-button-prev) {
  left: -20px;
}

:deep(.swiper .swiper-button-next) {
  right: -20px;
}

:deep(.swiper .swiper-button-next::after),
:deep(.swiper .swiper-button-prev::after) {
  font-size: 18px;
  font-weight: bold;
}

:deep(.swiper .swiper-button-next:hover),
:deep(.swiper .swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

/* Responsive Styles */
@media (max-width: 1440px) {
  .content {
    padding-bottom: 100px;
  }

  .content h1 {
    font-size: 3.5rem;
  }

  .content p {
    font-size: 0.8rem;
    margin-bottom: 20px;
  }

  .content .colors {
    margin-bottom: 30px;
  }

  .item-img .img-container {
    width: 400px;
    height: 400px;
  }

  .item-img .img-container::before {
    width: 600px;
    height: 600px;
  }

  .item-img .img-container img {
    width: 400px;
    height: 500px;
  }

  .content .pricing .add-to-cart {
    padding: 10px 20px;
    font-size: 1rem;
  }

  .content .pricing .price {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .banner {
    min-height: 100vh;
  }

  .banner-swiper-container {
    height: 180px;
    padding: 20px;
  }

  .banner-slide {
    flex-direction: column-reverse;
  }

  .content {
    width: 100%;
    height: 50%;
    padding: 20px 20px 0 100px;
    justify-content: start;
  }

  .content h1 {
    font-size: 2rem;
  }

  .content p {
    font-size: 0.6rem;
    margin-bottom: 20px;
  }

  .content .pricing {
    gap: 15px;
  }

  .item-img {
    width: 100%;
    height: 50%;
    padding: 20px 20px 0 100px;
  }

  .item-img .img-container {
    width: 200px;
    height: 200px;
  }

  .item-img .img-container::before {
    width: 300px;
    height: 300px;
  }

  .item-img .img-container img {
    width: 200px;
    height: 300px;
  }

  .banner-swiper {
    max-width: 400px;
  }

  :deep(.swiper .swiper-button-prev),
  :deep(.swiper .swiper-button-next) {
    width: 35px;
    height: 35px;
  }

  :deep(.swiper .swiper-button-next::after),
  :deep(.swiper .swiper-button-prev::after) {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .banner-swiper-container {
    height: 160px;
    padding: 15px;
  }

  .banner-swiper {
    max-width: 300px;
  }

  :deep(.swiper .swiper-button-prev),
  :deep(.swiper .swiper-button-next) {
    width: 30px;
    height: 30px;
  }

  :deep(.swiper .swiper-button-next::after),
  :deep(.swiper .swiper-button-prev::after) {
    font-size: 14px;
  }
}
</style>

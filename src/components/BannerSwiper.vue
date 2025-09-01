<template>
  <swiper
    :slidesPerView="getSlidesPerView()"
    :spaceBetween="getSpaceBetween()"
    :navigation="true"
    :modules="modules"
    class="banner-swiper"
  >
    <SwiperSlide v-for="item in items.slice(0, 5)" :key="item.id">
      <img :src="item.imgUrl" :alt="item.name" @click="bannerChange(item.id)" />
    </SwiperSlide>
  </swiper>
</template>

<script setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'

const components = {
  Swiper,
  SwiperSlide,
}

const modules = [Navigation]

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  bannerChange: {
    type: Function,
    required: true,
  },
})

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
</script>

<style>
.banner-swiper {
  width: 100%;
  height: 100%;
  max-width: 600px;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.swiper-slide:hover img {
  transform: scale(1.05);
}

.swiper .swiper-button-prev,
.swiper .swiper-button-next {
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

.swiper .swiper-button-prev {
  left: -20px;
}

.swiper .swiper-button-next {
  right: -20px;
}

.swiper .swiper-button-next::after,
.swiper .swiper-button-prev::after {
  font-size: 18px;
  font-weight: bold;
}

.swiper .swiper-button-next:hover,
.swiper .swiper-button-prev:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .banner-swiper {
    max-width: 400px;
  }

  .swiper .swiper-button-prev,
  .swiper .swiper-button-next {
    width: 35px;
    height: 35px;
  }

  .swiper .swiper-button-next::after,
  .swiper .swiper-button-prev::after {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .banner-swiper {
    max-width: 300px;
  }

  .swiper .swiper-button-prev,
  .swiper .swiper-button-next {
    width: 30px;
    height: 30px;
  }

  .swiper .swiper-button-next::after,
  .swiper .swiper-button-prev::after {
    font-size: 14px;
  }
}
</style>

<template>
  <div class="card">
    <div class="card-bg" :style="{ background: item.bgColor }"></div>

    <div class="imgBox">
      <img :src="item.imgUrl" :alt="item.name" />
    </div>
    <div class="contentBox">
      <h2>{{ item.name }}</h2>
      <div class="color">
        <h3>Color:</h3>
        <span
          v-for="color in item.colors"
          :key="color.id"
          :style="{ background: color.color }"
        ></span>
      </div>
      <div class="pricig">
        <span
          class="price"
          :style="[
            item.discount !== 0 && {
              textDecoration: 'line-through',
              textDecorationColor: 'red',
              fontSize: '1rem',
            },
          ]"
          >${{ item.price.toLocaleString() }}</span
        >
        <span class="price" v-if="item.discount !== 0"
          >${{ (item.price * (1 - item.discount)).toFixed(0) }}</span
        >
      </div>
      <div class="card-actions">
        <router-link :to="`/products/${item.id}`" class="btn btn-outline-primary btn-sm">
          Learn More <i class="bi bi-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped>
.card {
  position: relative;
  min-height: 420px;
  background: #232323;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.2);
}

.card-bg {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--primary);
  clip-path: circle(150px at 80% 20%);
  transition: ease-in-out 0.5s;
}

.card:hover .card-bg {
  clip-path: circle(300px at 80% -20.2%);
}

.card::after {
  content: 'SYLER';
  position: absolute;
  top: 40%;
  left: -20%;
  font-size: 12rem;
  font-weight: 800;
  font-style: italic;
  color: rgba(255, 255, 255, 0.04);
}

.card .imgBox {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 220px;
  transition: 0.5s;
}

.card:hover .imgBox {
  top: -15%;
}

.card .imgBox img {
  position: absolute;
  width: 270px;
  top: 10%;
  left: 10%;
  transform: rotateY(180deg);
}

.card .contentBox {
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 100px;
  text-align: center;
  transition: 1s;
  z-index: 10;
}

.card:hover .contentBox {
  height: 210px;
}

.card .contentBox h2 {
  position: relative;
  font-weight: 600;
  letter-spacing: 1px;
  color: #fff;
  font-size: 1.3rem;
}

.card .contentBox .color {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  transition: all 0.5 ease-in-out;
  opacity: 0;
  visibility: hidden;
}

.card:hover .contentBox .color {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.5s;
}

.card .contentBox .color h3 {
  color: #fff;
  font-weight: 300;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.card .contentBox .color span {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
}

.card .contentBox .pricig {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.card .contentBox .price {
  color: var(--primary);
  font-weight: 500;
  font-size: 1.2rem;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
}

.card:hover .contentBox .price {
  opacity: 1;
  visibility: visible;
  transition-delay: 0.7s;
}

.card .contentBox .card-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
  opacity: 0;
  transform: translateY(50px);
  transition: 0.5s;
}

.card:hover .contentBox .card-actions {
  opacity: 1;
  transform: translateY(0px);
  transition-delay: 0.7s;
}

.card .contentBox .card-actions .btn {
  padding: 8px 16px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.card .contentBox .card-actions .btn:hover {
  transform: translateY(-2px);
}

.card .contentBox .card-actions .btn-outline-primary {
  border-color: var(--primary);
  color: var(--primary);
  background: transparent;
}

.card .contentBox .card-actions .btn-outline-primary:hover {
  background: var(--primary);
  color: #fff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .card {
    min-height: 380px;
    width: 100%;
    max-width: 280px;
  }

  .card .imgBox {
    height: 200px;
  }

  .card .imgBox img {
    width: 240px;
    top: 8%;
    left: 8%;
  }

  .card .contentBox h2 {
    font-size: 1.1rem;
  }

  .card .contentBox .color h3 {
    font-size: 12px;
  }

  .card .contentBox .color span {
    width: 18px;
    height: 18px;
  }

  .card .contentBox .price {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .card {
    min-height: 350px;
    max-width: 260px;
  }

  .card .imgBox {
    height: 180px;
  }

  .card .imgBox img {
    width: 200px;
    top: 6%;
    left: 6%;
  }

  .card .contentBox h2 {
    font-size: 1rem;
  }

  .card .contentBox .color h3 {
    font-size: 11px;
  }

  .card .contentBox .color span {
    width: 16px;
    height: 16px;
  }

  .card .contentBox .price {
    font-size: 0.9rem;
  }

  .card .contentBox .card-actions .btn {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .card {
    min-height: 320px;
    max-width: 240px;
  }

  .card .imgBox {
    height: 160px;
  }

  .card .imgBox img {
    width: 180px;
    top: 5%;
    left: 5%;
  }

  .card .contentBox h2 {
    font-size: 0.9rem;
  }

  .card .contentBox .color h3 {
    font-size: 10px;
  }

  .card .contentBox .color span {
    width: 14px;
    height: 14px;
  }

  .card .contentBox .price {
    font-size: 0.8rem;
  }

  .card .contentBox .card-actions .btn {
    padding: 5px 10px;
    font-size: 0.7rem;
  }
}
</style>

<template>
  <section id="products" class="products">
    <div class="container">
      <div class="row">
        <h4 class="section-title">Products</h4>
      </div>
      <div class="row mt-4">
        <div class="col-xl-3 col-lg-4 col-md-6 col-12 mt-4" v-for="item in items" :key="item.id">
          <ItemCard :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import ItemCard from '@/components/ItemCard.vue'

const items = ref([])
onMounted(() => {
  fetch('https://schai-data.vercel.app/api/items')
    .then((res) => res.json())
    .then((data) => (items.value = data))
    .catch((e) => console.log(e.message))
})
</script>
<style scoped>
.products {
  background: #1e1e1e !important;
}

/* Phone-specific centering solution */
@media (max-width: 768px) {
  .products {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .products .row {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    justify-content: center;
  }

  .products .col-xl-3,
  .products .col-lg-4,
  .products .col-md-6,
  .products .col-12 {
    display: flex;
    justify-content: center;
  }
}

/* Extra small phone optimization */
@media (max-width: 576px) {
  .products .row {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .products .row {
    gap: 12px;
  }
}
</style>

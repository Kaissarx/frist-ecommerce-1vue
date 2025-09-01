<template>
  <tr class="shopCartItem">
    <th scope="row">{{ index + 1 }}</th>
    <td><img :src="item.imgUrl" :alt="item.name" class="img=img-fluid" /></td>
    <td>
      <router-link :to="`/products/${item.id}`">{{ item.name }}</router-link>
    </td>
    <td :style="{ color: item.color }"><i class="bi bi-record-fill"></i></td>
    <td>${{ item.price.toFixed(2) }}</td>
    <td>
      <div class="quantity-controls">
        <button
          @click="decreaseQuantity(item)"
          class="btn btn-sm btn-outline-primary"
          :disabled="item.qty <= 1"
        >
          <i class="bi bi-dash"></i>
        </button>
        <span class="quantity-display">{{ item.qty }}</span>
        <button @click="increaseQuantity(item)" class="btn btn-sm btn-outline-primary">
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </td>
    <td>{{ item.discount * 100 }}%</td>
    <td>${{ (item.price * item.qty * (1 - item.discount)).toFixed(2) }}</td>
    <td>
      <button @click="handleRemoveFromCart(item)" class="btn btn-sm btn-danger" title="Remove item">
        <i class="bi bi-trash3"></i>
      </button>
    </td>
  </tr>
</template>
<script setup>
import { inject, ref } from 'vue'

const cart = ref(inject('cart'))
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const handleRemoveFromCart = (target) => {
  let index = cart.value.indexOf(target)
  cart.value.splice(index, 1)
}

const increaseQuantity = (item) => {
  item.qty += 1
}

const decreaseQuantity = (item) => {
  if (item.qty > 1) {
    item.qty -= 1
  }
}
</script>
<style scoped>
.shopCartItem {
  margin-bottom: 20px;
}
.shopCartItem tr {
  margin-bottom: 20px !important;
}

.shopCartItem td,
.shopCartItem th {
  background: transparent;
  color: #fff;
  font-size: 1.2rem;
}

.shopCartItem a {
  color: #fff;
  font-size: 1.6rem;
}

.shopCartItem img {
  width: 120px;
  height: 70px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.shopCartItem i {
  font-size: 2rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
}

.quantity-display {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  color: var(--primary);
}

.btn-outline-primary {
  border-color: var(--primary);
  color: var(--primary);
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-primary:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.btn-outline-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .shopCartItem td,
  .shopCartItem th {
    font-size: 1rem;
  }

  .shopCartItem a {
    font-size: 1.2rem;
  }

  .shopCartItem img {
    width: 100px;
    height: 60px;
  }

  .shopCartItem i {
    font-size: 1.5rem;
  }

  .quantity-controls {
    gap: 6px;
  }

  .btn-outline-primary {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 576px) {
  .shopCartItem td,
  .shopCartItem th {
    font-size: 0.9rem;
  }

  .shopCartItem a {
    font-size: 1rem;
  }

  .shopCartItem img {
    width: 80px;
    height: 50px;
  }

  .shopCartItem i {
    font-size: 1.2rem;
  }

  .quantity-controls {
    gap: 4px;
  }

  .btn-outline-primary {
    width: 28px;
    height: 28px;
  }
}
</style>

<template>
  <div class="shoppingCart" v-if="cart.length > 0">
    <div class="container">
      <div class="row">
        <div class="table-responsive">
          <table class="shopCartTable table table-hover table-striped table-bordered align-middle">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Preview</th>
                <th scope="col">Product</th>
                <th scope="col">Color</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Discount</th>
                <th scope="col">Payment</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              <CartItem v-for="(item, index) in cart" :key="item.id" :item="item" :index="index" />
            </tbody>
          </table>
        </div>
      </div>
      <div class="row d-flex justify-content-between mt-5">
        <div class="col-lg-2 align-items-center">
          <p class="itemCount">Total Items: {{ getTotalQuantity() }}</p>
        </div>
        <div class="col-lg-10 d-flex justify-content-end">
          <div class="payment">
            <p>Total: {{ total }} $</p>
            <a href="#">Check Out <i class="bi bi-credit-card-2-back-fill"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="shoppingCart" v-else>
    <div class="container">
      <div class="row smile mt-5">
        <h1>Your Cart is Empty <i class="bi bi-emoji-smile-upside-down-fill"></i>.</h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import { inject, ref, computed } from 'vue'

const cart = ref(inject('cart'))

const handleTotalPayment = () => {
  let totals = cart.value
    .map((item) => item.price * item.qty * (1 - item.discount))
    .reduce((ac, currentValue) => ac + currentValue, 0)
    .toFixed(2)
  return totals
}

const getTotalQuantity = () => {
  return cart.value.reduce((total, item) => total + item.qty, 0)
}

// Use computed property to automatically recalculate total when cart changes
const total = computed(() => handleTotalPayment())
</script>
<style scoped>
.shoppingCart {
  position: relative;
  margin-bottom: 40px;
  min-height: 30vh;
}

.shoppingCart h1 {
  color: #fff;
}

.shopCartTable {
  margin-top: 50px;
  color: #fff;
  background: var(--bgColor);
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.2);
}

.shopCartTable thead tr {
  font-size: 1.3rem;
}

.shopCartTable thead tr th {
  background: transparent;
  color: #fff;
  border-color: rgba(255, 255, 255, 0.2);
}

/* Enhanced table styling with custom colors */
.shopCartTable tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.shopCartTable tbody tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}

.shopCartTable tbody tr:nth-child(odd) {
  background-color: transparent;
}

.shopCartTable td {
  border-color: rgba(255, 255, 255, 0.2);
}

.itemCount {
  font-size: 1.3rem;
  color: #fff;
}

.payment {
  display: inline-flex;
  align-items: center;
  gap: 50px;
  font-size: 1.3rem;
  color: #fff;
}

.payment a {
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--primary);
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.2);
}

.smile i {
  color: gold;
}

/* Responsive Design */
@media (max-width: 1140px) {
  .shoppingCart {
    padding-left: 5%;
  }
}

@media (max-width: 768px) {
  .shoppingCart {
    padding-left: 2%;
    padding-right: 2%;
  }

  .shopCartTable {
    font-size: 0.9rem;
  }

  .shopCartTable thead tr th {
    font-size: 1rem;
    padding: 8px 4px;
  }

  .shopCartItem td,
  .shopCartItem th {
    font-size: 0.9rem;
    padding: 8px 4px;
  }

  .shopCartItem img {
    width: 80px;
    height: 50px;
  }

  .payment {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
}

@media (max-width: 576px) {
  .shoppingCart {
    padding-left: 1%;
    padding-right: 1%;
  }

  .shopCartTable {
    font-size: 0.8rem;
  }

  .shopCartTable thead tr th {
    font-size: 0.9rem;
    padding: 6px 2px;
  }

  .shopCartItem td,
  .shopCartItem th {
    font-size: 0.8rem;
    padding: 6px 2px;
  }

  .shopCartItem img {
    width: 60px;
    height: 40px;
  }

  .quantity-controls {
    flex-direction: column;
    gap: 4px;
  }

  .btn-outline-primary {
    width: 28px;
    height: 28px;
  }
}
</style>

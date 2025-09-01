<template>
  <div>
    <div class="product-details py-5">
    <div class="container">
        <div class="row">
          <!-- Left Side: Thumbnail Images (Hidden on small screens) -->
          <div class="col-lg-2 d-none d-lg-block">
            <div class="row">
              <div class="col">
                <div class="itemPreview">
                  <img
                    v-for="photo in item.deImg"
                    :key="photo.id"
                    :src="photo['Img-de']"
                    class="img-fluid thumbnail-img"
                    :alt="item.name"
                  />
            </div>
              </div>
            </div>
              </div>

          <!-- Middle: Main Product Image (Responsive columns) -->
          <div class="col-6 col-lg-5 col-phone-7">
            <div class="main-image-container">
              <img :src="item.imgUrl" :alt="item.name" class="img-fluid itemImg" />
            </div>
          </div>

          <!-- Right: Product Details (Responsive columns) -->
          <div class="col-6 col-lg-5 col-phone-5">
            <div class="product-info">
              <h2 class="product-title">{{ item.name }}</h2>

              <!-- Pricing Section (Keep exact logic, enhance styling) -->
              <div class="itemPrice">
                <h4 class="price" v-if="item.price">Price: {{ item.price.toLocaleString() }}</h4>
                <h4 class="discount" v-if="item.discount !== 0">
                  <i>{{ (item.discount * 100).toFixed(0) }}% off</i>
                </h4>
                <h4 class="currentPrice" v-if="item.discount !== 0">
                  <span class="now">Now</span>: {{ ((1 - item.discount) * item.price).toFixed(2) }}
                  <span class="s">$</span>
                </h4>
              </div>

              <!-- Product Details (Collapsible on mobile) -->
              <div class="details-section">
                <h4 class="section-title">Product Details</h4>

                <!-- Short version (mobile) -->
                <p class="product-description mobile-short" v-if="!showFullDetails">
                  {{ truncatedDetails }}
                </p>

                <!-- Full version (desktop + expanded mobile) -->
                <p class="product-description mobile-full" v-if="showFullDetails">
                  {{ item.details }}
                </p>

                <!-- Know More Button (mobile only) -->
                <button
                  v-if="!showFullDetails"
                  class="know-more-btn"
                  @click="showFullDetails = true"
                >
                  Know More
                </button>

                <!-- Show Less Button (mobile only) -->
                <button
                  v-if="showFullDetails"
                  class="show-less-btn"
                  @click="showFullDetails = false"
                >
                  Show Less
                </button>
            </div>

              <!-- Color Selection (Keep exact logic, enhance styling) -->
              <div class="color-section">
                <h4 class="section-title">Color</h4>
                <div class="color" v-if="item.colors">
                  <span
                    v-for="color in item.colors"
                    :key="color.id"
                    :style="{ background: color.color }"
                    :class="{ active: color.active }"
                    @click="handelColorChange(color.color, color.id)"
                    class="color-swatch"
                  ></span>
          </div>
        </div>

              <!-- Quantity Section (Keep exact logic, enhance styling) -->
              <div class="quantity-section">
                <h4 class="section-title">Quantity</h4>
                <div class="quantity">
                  <a href="" class="qtyButton" @click.stop.prevent="handelQtyChange(false)">
                    <i class="bi bi-dash"></i>
                  </a>
                  <span class="qty">{{ qty }}</span>
                  <a href="" class="qtyButton" @click.stop.prevent="handelQtyChange(true)">
                    <i class="bi bi-plus"></i>
                  </a>
        </div>
      </div>

              <!-- Add to Cart Button (Keep exact logic, enhance styling) -->
              <div class="action-section">
                <a href="#" class="addButton" @click.stop.prevent="handleAddToCart(item)">
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted, inject, computed, onUnmounted } from 'vue'

const route = useRoute()
const id = route.params.id

const item = ref({})
const selectedColor = ref('#fdb82c')
const qty = ref(1)
const showFullDetails = ref(false)
const windowWidth = ref(window.innerWidth)

// Computed property for truncated text with responsive limits
const truncatedDetails = computed(() => {
  if (item.value.details) {
    // Use different character limits based on screen size
    let charLimit = 120 // Default for tablets and larger screens

    // Use smaller limit for phones only
    if (windowWidth.value <= 767) {
      charLimit = 59 // Fewer characters on phones for cleaner experience
    }

    return item.value.details.length > charLimit
      ? item.value.details.substring(0, charLimit) + '...'
      : item.value.details
  }
  return ''
})

onMounted(() => {
  fetch(`https://schai-data.vercel.app/api/items/${id}`)
    .then((res) => res.json())
    .then((data) => {
      item.value = data
      // Set first color as active by default
      if (data.colors && data.colors.length > 0) {
        selectedColor.value = data.colors[0].color
        data.colors[0].active = true
      }
    })
    .catch((e) => console.log(e.message))

  // Add resize listener for responsive text truncation
  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  window.addEventListener('resize', handleResize)

  // Clean up event listener
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

const handelColorChange = (color, id) => {
  selectedColor.value = color
  item.value.colors.forEach((colorItem) => {
    colorItem.active = colorItem.id === id
  })
}

const cart = inject('cart')

const handleAddToCart = (item) => {
  const itemToAdd = {
    ...item,
    color: selectedColor.value,
    qty: qty.value,
  }
  cart.value.push(itemToAdd)
}

const handelQtyChange = (add = true) => {
  if (add) {
    qty.value += 1
  } else {
    if (qty.value < 2) return
      qty.value -= 1
  }
}
</script>

<style scoped>
.product-details {
  transition: 0.5s;
}

h1,
h2,
h3,
h4,
h5,
p {
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

.product-details h2 {
  margin-bottom: 20px;
}

.product-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 25px;
  color: #fff;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #fff;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 8px;
  display: inline-block;
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 25px;
}

.itemPreview {
  background: var(--bgColor);
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
}

.itemPrice {
  display: inline-flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
}

.discount {
  color: var(--third);
}

.currentPrice {
  font-size: 1.6rem;
}

.currentPrice .s {
  color: rgb(24, 153, 24);
  font-size: larger;
}

.currentPrice .now {
  font-size: 2.5rem;
  font-style: italic;
  color: var(--primary);
}

.price {
  color: var(--primary);
}

.color {
  display: inline-flex;
  gap: 20px;
  margin-bottom: 20px;
}

.color span {
  padding: 10px;
  content: '';
  border: 5px solid #fff;
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
}

.color span:hover,
.color span.active {
  box-shadow: 0px 0 20px rgba(253, 184, 44, 0.815);
}

.color-swatch {
  padding: 10px;
  content: '';
  border: 5px solid #fff;
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
}

.quantity {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 120px;
  background: var(--bgColor);
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.2);
  margin-bottom: 50px;
}

.qty {
  font-size: 1.3rem;
  color: var(--primary);
}

.qtyButton {
  color: var(--primary);
}

.qtyButton i {
  font-size: 1.2rem;
}

.addButton {
  position: relative;
  margin-top: 20px;
  color: #fff;
  text-decoration: none;
  padding: 10px 25px;
  width: 300px;
  background: var(--primary);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 300;
  transition: 0.5s;
}

.addButton:hover {
  background: #fe9400;
}

/* Collapsible Details Styles */
.know-more-btn,
.show-less-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
  display: none;
}

.know-more-btn:hover,
.show-less-btn:hover {
  background: #fe9400;
  transform: translateY(-1px);
}

.show-less-btn {
  background: var(--third);
}

.show-less-btn:hover {
  background: #e74c3c;
}

/* Responsive Design for Small Screens */
@media (max-width: 991px) {
  /* Hide thumbnails completely on small screens */
  .col-lg-2 {
    display: none !important;
  }

  /* Make remaining sections smaller */
  .col-6 {
    padding: 0 10px;
  }

  .main-image-container {
    padding: 15px;
    margin-bottom: 20px;
  }

  .itemImg {
    max-width: 100%;
    height: auto;
  }

  .product-info {
    padding: 20px;
    margin-top: 0;
  }

  .product-details h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  .itemPrice {
    gap: 15px;
    margin-bottom: 15px;
  }

  .currentPrice {
    font-size: 1.4rem;
  }

  .currentPrice .now {
    font-size: 2rem;
  }

  .color {
    gap: 15px;
    margin-bottom: 15px;
  }

  .quantity {
    width: 100px;
    padding: 8px;
    margin-bottom: 30px;
  }

  .addButton {
    width: 250px;
    padding: 8px 20px;
    font-size: 1.1rem;
  }
}

@media (max-width: 767px) {
  /* Phone-specific column layout: 7+5 instead of 6+6 */
  .col-phone-7 {
    flex: 0 0 58.333333% !important; /* 7/12 columns */
    max-width: 58.333333% !important;
  }

  /* Move chair image down on phones */
  .main-image-container {
    margin-top: 60px; /* Push image down on phones */
  }

  .col-phone-5 {
    flex: 0 0 41.666667% !important; /* 5/12 columns */
    max-width: 41.666667% !important;
  }

  .col-6 {
    padding: 0 5px;
  }

  .product-info {
    padding: 15px;
  }

  /* Smaller fonts for phones */
  .product-details h2 {
    font-size: 1.4rem; /* Smaller than current 1.6rem */
    text-align: center;
  }

  .currentPrice {
    font-size: 1.2rem; /* Smaller than current 1.4rem */
  }

  .currentPrice .now {
    font-size: 1.8rem; /* Smaller than current 2rem */
  }

  .price {
    font-size: 1.1rem; /* Smaller font for price */
  }

  .discount {
    font-size: 1rem; /* Smaller font for discount */
  }

  .itemPrice {
    justify-content: center;
    flex-wrap: wrap;
  }

  .color {
    justify-content: center;
  }

  .quantity {
    margin: 0 auto 25px auto;
  }

  .addButton {
    width: 200px;
    margin: 0 auto 0 0; /* Move button to left on phones */
    display: block;
  }

  /* Show collapsible buttons on mobile */
  .know-more-btn,
  .show-less-btn {
    display: block;
    margin: 10px auto 0 auto;
  }

  /* Mobile-specific text styling */
  .mobile-short {
    display: block;
  }

  .mobile-full {
    display: block;
  }
}
</style>

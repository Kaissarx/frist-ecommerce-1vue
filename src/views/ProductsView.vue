<template>
  <div class="products-page">
    <div class="container">
      <!-- Header -->
      <div class="row">
        <div class="col-12">
          <div class="products-header text-center">
            <h1 class="display-4 mb-4">Our Products</h1>
            <p class="lead">Discover our collection of premium gaming chairs</p>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="row justify-content-center mt-4">
        <div class="col-lg-6 col-md-8">
          <div class="search-container">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Search products..."
                v-model="searchQuery"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Products Count -->
      <div class="row mt-3">
        <div class="col-12">
          <p class="text-center text-muted">
            Showing {{ filteredProducts.length }} of {{ products.length }} products
          </p>
        </div>
      </div>

      <!-- Products Grid with Bootstrap Card-deck -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            <div class="col" v-for="product in filteredProducts" :key="product.id">
              <div class="card h-100 product-card">
                <div class="product-image">
                  <img :src="product.imgUrl" :alt="product.name" class="img-fluid" />
                  <div class="product-overlay">
                    <button
                      @click="addToCart(product)"
                      class="btn btn-primary addtoCartBtn btn-sm"
                      :disabled="isAddingToCart === product.id"
                    >
                      <span v-if="isAddingToCart === product.id">
                        <i class="bi bi-hourglass-split me-1"></i>Adding...
                      </span>
                      <span v-else> <i class="bi bi-cart-plus me-1"></i>Add to Cart </span>
                    </button>
                  </div>
                </div>

                <div class="card-body d-flex flex-column">
                  <h5 class="card-title product-title">{{ product.name }}</h5>

                  <div class="product-colors mb-2" v-if="product.colors">
                    <small class="text-muted">Colors:</small>
                    <div class="color-dots">
                      <span
                        v-for="color in product.colors"
                        :key="color.id"
                        class="color-dot"
                        :style="{ backgroundColor: color.color }"
                        :title="color.color"
                      ></span>
                    </div>
                  </div>

                  <div class="product-price mb-3">
                    <span v-if="product.discount && product.discount > 0" class="original-price">
                      ${{ product.price.toLocaleString() }}
                    </span>
                    <span class="current-price">
                      ${{ getDiscountedPrice(product).toLocaleString() }}
                    </span>
                    <span v-if="product.discount && product.discount > 0" class="discount-badge">
                      -{{ (product.discount * 100).toFixed(0) }}%
                    </span>
                  </div>

                  <div class="product-actions mt-auto">
                    <router-link
                      :to="`/products/${product.id}`"
                      class="btn btn-outline-primary btn-sm me-2"
                    >
                      <i class="bi bi-eye me-1"></i>View Details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Products Found -->
      <div v-if="filteredProducts.length === 0" class="row mt-5">
        <div class="col-12 text-center">
          <div class="no-products">
            <i class="bi bi-search display-1 text-muted"></i>
            <h3 class="mt-3">No products found</h3>
            <p class="text-muted">Try adjusting your search terms</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { inject } from 'vue'

// Cart injection
const cart = inject('cart')

// Reactive data
const products = ref([])
const searchQuery = ref('')
const isAddingToCart = ref(null)

// Computed properties
const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) {
    return products.value
  }

  const query = searchQuery.value.toLowerCase().trim()
  return products.value.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query)),
  )
})

// Methods
const fetchProducts = async () => {
  try {
    const response = await fetch('https://schai-data.vercel.app/api/items')
    const data = await response.json()
    products.value = data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const getDiscountedPrice = (product) => {
  if (product.discount && product.discount > 0) {
    return product.price * (1 - product.discount)
  }
  return product.price
}

const addToCart = async (product) => {
  isAddingToCart.value = product.id

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Check if product already exists in cart
    const existingItem = cart.value.find((item) => item.id === product.id)

    if (existingItem) {
      // Increase quantity if already in cart
      existingItem.qty += 1
    } else {
      // Add new item to cart
      cart.value.push({
        ...product,
        qty: 1,
      })
    }

    // Show success feedback (you could add a toast notification here)
    console.log('Product added to cart:', product.name)
  } catch (error) {
    console.error('Error adding to cart:', error)
  } finally {
    isAddingToCart.value = null
  }
}

// Lifecycle
onMounted(() => {
  fetchProducts()
})

// Watcher for search query (as required by task)
watch(searchQuery, (newQuery) => {
  // The computed property automatically filters products when searchQuery changes
  console.log('Search query changed to:', newQuery)
})
</script>

<style scoped>
.products-page {
  padding: 80px 0;
  min-height: 100vh;
  background: #1e1e1e;
  color: #fff;
}

.products-header h1 {
  color: var(--primary);
  font-weight: 700;
}

.products-header .lead {
  color: #ccc;
  font-size: 1.25rem;
}

.search-container {
  background: #232323;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
}

.search-container .input-group-text {
  background: #1e1e1e;
  border: 2px solid #333;
  color: var(--primary);
  border-right: none;
}

.addtoCartBtn {
  background: var(--primary) !important;
  border: none !important;
}

.addtoCartBtn:hover {
  background: #fe9400 !important;
  transform: scale(1.05);
}

.search-container .form-control {
  background: #1e1e1e;
  border: 2px solid #333;
  color: #fff;
  border-left: none;
}

.search-container .form-control:focus {
  background: #1e1e1e;
  border-color: var(--primary);
  color: #fff;
  box-shadow: 0 0 0 0.2rem rgba(255, 20, 147, 0.25);
}

.search-container .form-control::placeholder {
  color: #666;
}

.product-card {
  background: #232323;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
}

/* Enhanced card styling with Bootstrap classes */
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 255, 255, 0.15);
}

.product-card .card-body {
  background: #232323;
  color: #fff;
}

.product-card .card-title {
  color: #fff;
  font-weight: 600;
}

.product-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.product-title {
  color: #fff;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 1.1rem;
  line-height: 1.4;
}

.product-colors {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-dots {
  display: flex;
  gap: 4px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #333;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-dot:hover {
  transform: scale(1.2);
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.original-price {
  color: #666;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.current-price {
  color: var(--primary);
  font-weight: 700;
  font-size: 1.2rem;
}

.discount-badge {
  background: #dc3545;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.btn-outline-primary {
  border-color: var(--primary);
  color: var(--primary);
}

.btn-outline-primary:hover {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}

.no-products {
  padding: 60px 20px;
}

.no-products i {
  color: #666;
}

.no-products h3 {
  color: #ccc;
}

.no-products p {
  color: #666;
}

@media (max-width: 768px) {
  .products-page {
    padding: 40px 0;
  }

  .products-header h1 {
    font-size: 2.5rem;
  }

  .search-container {
    padding: 15px;
  }

  /* Center product information on small screens */
  .product-title {
    text-align: center;
  }

  .product-colors {
    justify-content: center;
    flex-direction: column;
    gap: 8px;
  }

  .product-colors small {
    text-align: center;
    display: block;
  }

  .color-dots {
    justify-content: center;
  }

  .product-price {
    justify-content: center;
    flex-wrap: wrap;
  }

  .product-actions {
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .products-page {
    padding: 30px 0;
  }

  .products-header h1 {
    font-size: 2rem;
  }

  .search-container {
    padding: 12px;
  }

  .product-title {
    font-size: 1rem;
  }

  .product-price {
    gap: 8px;
  }

  .current-price {
    font-size: 1.1rem;
  }

  .original-price {
    font-size: 0.8rem;
  }

  .discount-badge {
    font-size: 0.7rem;
    padding: 1px 6px;
  }
}

@media (max-width: 480px) {
  .products-page {
    padding: 25px 0;
  }

  .products-header h1 {
    font-size: 1.8rem;
  }

  .products-header .lead {
    font-size: 1.1rem;
  }

  .search-container {
    padding: 10px;
  }

  .product-image {
    height: 200px;
  }

  .product-title {
    font-size: 0.9rem;
  }

  .product-colors small {
    font-size: 0.8rem;
  }

  .color-dot {
    width: 14px;
    height: 14px;
  }

  .current-price {
    font-size: 1rem;
  }

  .original-price {
    font-size: 0.75rem;
  }

  .discount-badge {
    font-size: 0.65rem;
    padding: 1px 5px;
  }

  .btn-outline-primary {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
</style>

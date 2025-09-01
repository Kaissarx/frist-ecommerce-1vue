import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import CartView from '@/views/CartView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import ProductsView from '@/views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home - Your Schair Store',
        description:
          'Welcome to Your Schair Store - Premium furniture and home decor. Discover quality chairs, tables, and home accessories for your perfect living space.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About Us - Your Schair Store',
        description:
          'Learn about Your Schair Store - our story, mission, and commitment to providing quality furniture and exceptional customer service.',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Contact Us - Your Schair Store',
        description:
          "Get in touch with Your Schair Store. We're here to help you find the perfect furniture for your home. Contact us today!",
      },
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: {
        title: 'Products - Your Schair Store',
        description:
          'Browse our extensive collection of premium furniture including chairs, tables, and home accessories. Find the perfect pieces for your home.',
      },
    },
    {
      path: '/products/:id',
      name: 'product',
      component: ProductDetailsView,
      meta: {
        title: 'Product Details - Your Schair Store',
        description:
          'Explore detailed information about our premium furniture products. View specifications, images, and pricing for quality home decor items.',
      },
    },
    {
      path: '/cart/',
      name: 'cart',
      component: CartView,
      meta: {
        title: 'Shopping Cart - Your Schair Store',
        description:
          'Review your shopping cart at Your Schair Store. Complete your purchase of premium furniture and home decor items.',
      },
    },
  ],
})

// Set document title and meta description based on route meta
router.beforeEach((to, from, next) => {
  // Set the title from route meta, or use default
  document.title = to.meta.title || 'Your Schair Store'

  // Update meta description if available
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }

  next()
})

export default router

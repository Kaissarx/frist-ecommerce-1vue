<template>
  <div class="contact-page">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="contact-header text-center">
            <h1 class="display-4 mb-4">Contact Us</h1>
            <p class="lead">Get in touch with our team. We'd love to hear from you!</p>
          </div>
        </div>
      </div>

      <div class="row justify-content-center mt-5">
        <div class="col-lg-8 col-md-10">
          <div class="contact-form-container">
            <!-- Success Message -->
            <div v-if="showSuccess" class="alert alert-success text-center mb-4" role="alert">
              <i class="bi bi-check-circle-fill me-2"></i>
              Thank you for contacting us!
            </div>

            <!-- Contact Form -->
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.name }"
                      id="name"
                      v-model="formData.name"
                      placeholder="Enter your name"
                    />
                    <label for="name">Name *</label>
                    <div v-if="errors.name" class="invalid-feedback">
                      {{ errors.name }}
                    </div>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-invalid': errors.email }"
                      id="email"
                      v-model="formData.email"
                      placeholder="Enter your email"
                    />
                    <label for="email">Email *</label>
                    <div v-if="errors.email" class="invalid-feedback">
                      {{ errors.email }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    :class="{ 'is-invalid': errors.message }"
                    id="message"
                    style="height: 120px"
                    v-model="formData.message"
                    placeholder="Enter your message"
                  ></textarea>
                  <label for="message">Message *</label>
                  <div v-if="errors.message" class="invalid-feedback">
                    {{ errors.message }}
                  </div>
                </div>
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-primary btn-lg px-5" :disabled="isSubmitting">
                  <span v-if="isSubmitting">
                    <i class="bi bi-hourglass-split me-2"></i>Sending...
                  </span>
                  <span v-else> <i class="bi bi-send me-2"></i>Send Message </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="contact-info-grid">
        <div class="contact-info-card text-center">
          <div class="info-icon mb-3">
            <i class="bi bi-geo-alt-fill"></i>
          </div>
          <h4>Address</h4>
          <p>Helwan, Cairo Egypt</p>
        </div>

        <div class="contact-info-card text-center">
          <div class="info-icon mb-3">
            <i class="bi bi-telephone-fill"></i>
          </div>
          <h4>Phone</h4>
          <p>+20 11234567890<br />+22 7894561</p>
        </div>

        <div class="contact-info-card text-center">
          <div class="info-icon mb-3">
            <i class="bi bi-envelope-fill"></i>
          </div>
          <h4>Email</h4>
          <p>info@schair.com<br />support@schair.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const formData = reactive({
  name: '',
  email: '',
  message: '',
})

// Form validation errors
const errors = reactive({
  name: '',
  email: '',
  message: '',
})

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Validation function
const validateForm = () => {
  let isValid = true

  // Reset errors
  Object.keys(errors).forEach((key) => {
    errors[key] = ''
  })

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
    isValid = false
  }

  return isValid
}

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Form submission handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Show success message
    showSuccess.value = true

    // Reset form
    formData.name = ''
    formData.email = ''
    formData.message = ''

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  padding: 80px 0;
  min-height: 100vh;
  background: #1e1e1e;
  color: #fff;
}

.contact-header h1 {
  color: var(--primary);
  font-weight: 700;
}

.contact-header .lead {
  color: #ccc;
  font-size: 1.25rem;
}

.contact-form-container {
  background: #232323;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
}

/* Form-floating custom styling to match your theme */
.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  color: var(--primary);
}

.form-floating > .form-control:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 0.25rem rgba(var(--primary-rgb), 0.25);
}

.form-floating > .form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.form-floating > .form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-floating > label {
  color: rgba(255, 255, 255, 0.8);
}

.contact-form .form-label {
  color: #fff;
  font-weight: 600;
  margin-bottom: 8px;
}

.contact-form .form-control {
  background: #1e1e1e;
  border: 2px solid #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.contact-form .form-control:focus {
  background: #1e1e1e;
  border-color: var(--primary);
  color: #fff;
  box-shadow: 0 0 0 0.2rem rgba(255, 20, 147, 0.25);
}

.contact-form .form-control::placeholder {
  color: #666;
}

.contact-form .form-control.is-invalid {
  border-color: #dc3545;
}

.contact-form .invalid-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 4px;
}

.btn-primary {
  background: var(--primary);
  border: none;
  padding: 12px 30px;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 20, 147, 0.3);
}

.btn-primary:disabled {
  background: #666;
  transform: none;
  box-shadow: none;
}

.alert-success {
  background: rgba(25, 135, 84, 0.1);
  border: 1px solid rgba(25, 135, 84, 0.3);
  color: #75b798;
}

.contact-info-card {
  background: #232323;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 0 15px rgba(255, 255, 255, 0.1);
  height: 100%;
  transition: transform 0.3s ease;
}

.contact-info-card:hover {
  transform: translateY(-5px);
}

.info-icon {
  font-size: 2.5rem;
  color: var(--primary);
}

.contact-info-card h4 {
  color: var(--primary);
  font-weight: 600;
  margin-bottom: 15px;
}

.contact-info-card p {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 0;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 50px;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .contact-info-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
  }
}

@media (max-width: 991px) {
  .contact-info-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 40px 0;
  }

  .contact-header h1 {
    font-size: 2.5rem;
  }

  .contact-form-container {
    padding: 25px;
  }

  .contact-info-card {
    padding: 20px;
  }

  .contact-info-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
    margin-top: 30px;
  }
}

@media (max-width: 576px) {
  .contact-info-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-top: 25px;
  }

  .contact-info-card {
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .contact-info-card {
    padding: 15px;
  }
}
</style>

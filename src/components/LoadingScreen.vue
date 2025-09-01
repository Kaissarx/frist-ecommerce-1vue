<template>
  <div class="loading-screen" :class="{ 'fade-out': isLoadingComplete }">
    <!-- Dark Gaming Background -->
    <div class="loading-background">
      <!-- Animated Background Elements -->
      <div class="cyber-grid"></div>
      <div class="floating-particles"></div>

      <!-- Main Loading Content -->
      <div class="loading-content">
        <!-- Gaming Controller Icon -->
        <div class="controller-container">
          <div class="gaming-controller">
            <div class="controller-body">
              <div class="controller-button left"></div>
              <div class="controller-button right"></div>
              <div class="controller-stick left-stick"></div>
              <div class="controller-stick right-stick"></div>
              <div class="controller-dpad">
                <div class="dpad-up"></div>
                <div class="dpad-down"></div>
                <div class="dpad-left"></div>
                <div class="dpad-right"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- SChair Gaming Logo -->
        <div class="brand-logo">
          <div class="logo-container">
            <span class="logo-text"> <span class="s">S</span>Chair </span>
            <div class="logo-subtitle">Gaming Experience</div>
          </div>
        </div>

        <!-- Loading Progress -->
        <div class="loading-progress">
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            <div class="progress-text">{{ progress }}%</div>
          </div>
        </div>

        <!-- Loading Message -->
        <div class="loading-message">
          <div class="message-text">{{ currentMessage }}</div>
          <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['loading-complete'])

const progress = ref(0)
const currentMessage = ref('Initializing Gaming Experience...')
const isLoadingComplete = ref(false)

const loadingMessages = [
  'Initializing Gaming Experience...',
  'Loading Premium Furniture...',
  'Preparing Your Gaming Setup...',
  'Almost Ready...',
  'Welcome to SChair Gaming!',
]

let progressInterval
let messageInterval

onMounted(() => {
  startLoading()
})

onUnmounted(() => {
  clearIntervals()
})

const startLoading = () => {
  // Simulate loading progress
  progressInterval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += Math.random() * 15
      if (progress.value > 100) progress.value = 100
    } else {
      completeLoading()
    }
  }, 200)

  // Change loading messages
  let messageIndex = 0
  messageInterval = setInterval(() => {
    if (progress.value < 100) {
      messageIndex = (messageIndex + 1) % loadingMessages.length
      currentMessage.value = loadingMessages[messageIndex]
    }
  }, 1500)
}

const completeLoading = () => {
  clearIntervals()
  isLoadingComplete.value = true

  // Emit loading complete after animation
  setTimeout(() => {
    emit('loading-complete')
  }, 3000)
}

const clearIntervals = () => {
  if (progressInterval) clearInterval(progressInterval)
  if (messageInterval) clearInterval(messageInterval)
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    opacity 1s ease-out,
    visibility 1s ease-out;
}

.loading-screen.fade-out {
  opacity: 0;
  visibility: hidden;
}

.loading-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Cyber Grid Background */
.cyber-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50px, 50px);
  }
}

/* Floating Particles */
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-particles::before,
.floating-particles::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--primary);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.floating-particles::before {
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.floating-particles::after {
  top: 60%;
  right: 20%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 1;
  }
}

/* Main Loading Content */
.loading-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 40px;
}

/* Gaming Controller */
.controller-container {
  margin-bottom: 20px;
}

.gaming-controller {
  width: 120px;
  height: 80px;
  position: relative;
  animation: controllerFloat 3s ease-in-out infinite;
}

@keyframes controllerFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

.controller-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #333, #666);
  border-radius: 20px;
  position: relative;
  border: 2px solid var(--primary);
  box-shadow: 0 0 20px rgba(253, 184, 44, 0.5);
}

.controller-button {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  animation: buttonGlow 2s ease-in-out infinite;
}

.controller-button.left {
  top: 15px;
  left: 20px;
}

.controller-button.right {
  top: 15px;
  right: 20px;
}

@keyframes buttonGlow {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(253, 184, 44, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(253, 184, 44, 0.8);
  }
}

.controller-stick {
  position: absolute;
  width: 15px;
  height: 15px;
  background: #444;
  border-radius: 50%;
  border: 2px solid var(--primary);
}

.left-stick {
  bottom: 15px;
  left: 25px;
}

.right-stick {
  bottom: 15px;
  right: 25px;
}

.controller-dpad {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dpad-up,
.dpad-down,
.dpad-left,
.dpad-right {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #555;
  border: 1px solid var(--primary);
}

.dpad-up {
  top: -6px;
  left: -6px;
}
.dpad-down {
  bottom: -6px;
  left: -6px;
}
.dpad-left {
  left: -6px;
  top: -6px;
}
.dpad-right {
  right: -6px;
  top: -6px;
}

/* Brand Logo */
.brand-logo {
  text-align: center;
}

.logo-container {
  margin-bottom: 10px;
}

.logo-text {
  font-size: 3.5rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 20px rgba(253, 184, 44, 0.8);
  letter-spacing: 0.2rem;
  animation: logoGlow 2s ease-in-out infinite;
}

.logo-text .s {
  color: var(--primary);
  font-size: 4rem;
  animation: sGlow 1.5s ease-in-out infinite;
}

@keyframes logoGlow {
  0%,
  100% {
    text-shadow: 0 0 20px rgba(253, 184, 44, 0.8);
  }
  50% {
    text-shadow: 0 0 30px rgba(253, 184, 44, 1);
  }
}

@keyframes sGlow {
  0%,
  100% {
    text-shadow: 0 0 15px rgba(253, 184, 44, 0.8);
  }
  50% {
    text-shadow: 0 0 25px rgba(253, 184, 44, 1);
  }
}

.logo-subtitle {
  font-size: 1.2rem;
  color: #ccc;
  font-weight: 300;
  letter-spacing: 0.1rem;
  margin-top: 5px;
}

/* Loading Progress */
.loading-progress {
  width: 300px;
  text-align: center;
}

.progress-container {
  position: relative;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(0, 255, 255, 0.3);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #00ffff);
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 20px rgba(253, 184, 44, 0.6);
  position: relative;
}

.progress-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: progressShine 2s linear infinite;
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.progress-text {
  margin-top: 10px;
  font-size: 1.1rem;
  color: var(--primary);
  font-weight: 600;
  text-shadow: 0 0 10px rgba(253, 184, 44, 0.5);
}

/* Loading Message */
.loading-message {
  text-align: center;
  margin-top: 20px;
}

.message-text {
  font-size: 1.1rem;
  color: #ccc;
  margin-bottom: 15px;
  font-weight: 400;
  letter-spacing: 0.05rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}
.dot:nth-child(2) {
  animation-delay: -0.16s;
}
.dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes dotBounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .logo-text {
    font-size: 2.8rem;
  }

  .logo-text .s {
    font-size: 3.2rem;
  }

  .logo-subtitle {
    font-size: 1rem;
  }

  .gaming-controller {
    width: 100px;
    height: 70px;
  }

  .loading-progress {
    width: 250px;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 2.2rem;
  }

  .logo-text .s {
    font-size: 2.5rem;
  }

  .gaming-controller {
    width: 80px;
    height: 60px;
  }

  .loading-progress {
    width: 200px;
  }

  .loading-content {
    gap: 30px;
  }
}
</style>

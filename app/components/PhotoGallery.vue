<template>
  <div class="relative w-full h-full overflow-hidden">
    <Swiper
      :modules="swiperModules"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 6000, disableOnInteraction: false }"
      effect="fade"
      :fade-effect="{ crossFade: true }"
      class="w-full h-full"
    >
      <SwiperSlide v-for="(photo, i) in photos" :key="i" class="w-full h-full">
        <div class="w-full h-full overflow-hidden">
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="w-full h-full object-cover"
            style="animation: kenBurns 12s ease-in-out infinite alternate;"
          />
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- Gradient overlay so text stays legible -->
    <div
      class="absolute inset-0 pointer-events-none z-10"
      style="background: linear-gradient(
        to bottom,
        rgba(0,0,0,0.35) 0%,
        rgba(0,0,0,0.15) 40%,
        rgba(0,0,0,0.45) 100%
      );"
    />
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

const swiperModules = [Autoplay, EffectFade]

// Replace src values with real photos — place files in /public/images/
const photos = [
  { src: '/images/photo-1.jpg', alt: 'Jorge e Beatriz — Foto 1' },
  { src: '/images/photo-2.jpg', alt: 'Jorge e Beatriz — Foto 2' },
  { src: '/images/photo-3.jpg', alt: 'Jorge e Beatriz — Foto 3' },
  { src: '/images/photo-4.jpg', alt: 'Jorge e Beatriz — Foto 4' },
  { src: '/images/photo-5.png', alt: 'Jorge e Beatriz — Foto 5' },
]
</script>


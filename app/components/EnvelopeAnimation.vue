<template>
  <div
    ref="sceneRef"
    class="fixed inset-0 z-50 flex items-center justify-center bg-ivory cursor-pointer select-none"
    @click="triggerOpen"
  >
    <!-- Hint text -->
    <p
      ref="hintRef"
      class="absolute bottom-10 text-champagne-500 font-display text-lg tracking-widest uppercase opacity-80"
    >
      Clique para abrir
    </p>

    <!-- Envelope -->
    <div ref="envelopeRef" class="envelope-wrapper relative w-80 md:w-96">

      <!-- Envelope body -->
      <div class="relative w-full" style="padding-top: 66%;">

        <!-- Back panel -->
        <div
          class="absolute inset-0 rounded-sm shadow-2xl"
          style="background: linear-gradient(135deg, #f5ede0 0%, #efe0cc 100%);"
        />

        <!-- Left triangle -->
        <div
          class="absolute inset-0 overflow-hidden rounded-sm"
        >
          <div
            class="absolute bottom-0 left-0 w-0 h-0"
            style="border-style:solid;border-width:0 0 130px 160px;border-color:transparent transparent #e8d4ba transparent;opacity:0.6;"
          />
          <!-- Right triangle -->
          <div
            class="absolute bottom-0 right-0 w-0 h-0"
            style="border-style:solid;border-width:130px 0 0 160px;border-color:transparent transparent transparent #e8d4ba;opacity:0.6;"
          />
        </div>

        <!-- Flap (rotates open on Y axis) -->
        <div
          ref="flapRef"
          class="flap absolute left-0 right-0 top-0 overflow-hidden"
          style="height: 54%;"
        >
          <div
            class="w-full h-full"
            style="background: linear-gradient(180deg, #efe0cc 0%, #e4d0b4 100%); clip-path: polygon(0 0, 100% 0, 50% 100%);"
          />
        </div>

        <!-- Wax seal -->
        <div
          ref="sealRef"
          class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center"
          style="top: 28%; width: 72px; height: 72px;"
        >
          <svg viewBox="0 0 72 72" class="w-full h-full drop-shadow-lg">
            <!-- Seal base -->
            <circle cx="36" cy="36" r="32" fill="#8B5E3C" />
            <!-- Star burst edges -->
            <polygon
              points="36,4 39,26 52,14 42,30 64,28 46,38 64,48 42,46 52,58 39,46 36,68 33,46 20,58 30,46 8,48 26,38 8,28 30,30 20,14 33,26"
              fill="#7a5234"
            />
            <!-- Inner circle -->
            <circle cx="36" cy="36" r="22" fill="none" stroke="#c9963a" stroke-width="1.5" />
            <!-- Monogram -->
            <text
              x="36" y="41"
              text-anchor="middle"
              font-family="'Cormorant Garamond', serif"
              font-size="16"
              font-weight="600"
              fill="#f5ede0"
              letter-spacing="2"
            >J&amp;B</text>
          </svg>
        </div>

        <!-- Invitation card (slides up) -->
        <div
          ref="cardRef"
          class="absolute left-4 right-4 rounded-sm shadow-lg flex flex-col items-center justify-center py-8 px-6 text-center"
          style="bottom: 4px; top: 4px; background:#fdfaf4; opacity:0; pointer-events:none;"
        >
          <p class="font-display text-champagne-500 tracking-[0.3em] uppercase text-xs mb-2">Convidados a celebrar</p>
          <h1 class="font-display text-3xl md:text-4xl text-stone-700 leading-snug">Jorge<br/><span class="text-champagne-400">&amp;</span><br/>Beatriz</h1>
          <div class="ornament my-4 w-3/4 text-champagne-300 text-xs tracking-widest">✦</div>
          <p class="font-display text-stone-500 text-sm tracking-widest">19 · IX · MMXXVI</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const emit = defineEmits<{ opened: [] }>()

const sceneRef  = ref<HTMLElement | null>(null)
const envelopeRef = ref<HTMLElement | null>(null)
const flapRef   = ref<HTMLElement | null>(null)
const sealRef   = ref<HTMLElement | null>(null)
const cardRef   = ref<HTMLElement | null>(null)
const hintRef   = ref<HTMLElement | null>(null)

let hasTriggered = false

// Pulse the hint text
onMounted(() => {
  gsap.to(hintRef.value, {
    opacity: 0.3,
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  // Also listen for first scroll
  window.addEventListener('scroll', triggerOpen, { once: true })
  window.addEventListener('wheel',  triggerOpen, { once: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', triggerOpen)
  window.removeEventListener('wheel',  triggerOpen)
})

function triggerOpen() {
  if (hasTriggered) return
  hasTriggered = true

  const tl = gsap.timeline({
    onComplete: () => emit('opened'),
  })

  // 1. Hint fades out
  tl.to(hintRef.value, { opacity: 0, duration: 0.3 })

  // 2. Seal cracks: shake + shrink + blur
  tl.to(sealRef.value, {
    x: -4, duration: 0.05, repeat: 5, yoyo: true, ease: 'none',
  }, '<')
  tl.to(sealRef.value, {
    scale: 0,
    opacity: 0,
    filter: 'blur(6px)',
    duration: 0.45,
    ease: 'back.in(2)',
  })

  // 3. Flap opens (rotateX from 0 → -180)
  tl.to(flapRef.value, {
    rotateX: -180,
    duration: 0.9,
    ease: 'power2.inOut',
    transformOrigin: 'top center',
  })

  // 4. Card slides up out of the envelope
  tl.to(cardRef.value, {
    opacity: 1,
    y: -20,
    duration: 0.5,
    ease: 'power2.out',
    pointerEvents: 'auto',
  }, '-=0.3')

  // 5. Brief pause so user can read card, then entire scene fades out
  tl.to(sceneRef.value, {
    opacity: 0,
    duration: 0.8,
    ease: 'power1.inOut',
    delay: 1.1,
  })
}
</script>


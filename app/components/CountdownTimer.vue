<template>
  <div>
    <!-- Wedding day reached -->
    <p v-if="isToday" class="font-display text-2xl text-champagne-400 tracking-widest">
      Hoje é o nosso dia! 🎉
    </p>

    <!-- Live countdown -->
    <div v-else class="flex gap-6 md:gap-10 justify-center">
      <div v-for="unit in units" :key="unit.label" class="flex flex-col items-center">
        <span class="font-display text-4xl md:text-6xl text-white tabular-nums leading-none drop-shadow">
          {{ unit.value }}
        </span>
        <span class="font-body text-xs md:text-sm text-white/70 uppercase tracking-widest mt-2">
          {{ unit.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Wedding date: 19 September 2026 at 16:00 Lisbon time (UTC+1 in September)
const WEDDING = new Date('2026-09-19T16:00:00+01:00')

const days    = ref(0)
const hours   = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isToday = ref(false)

const units = computed(() => [
  { value: pad(days.value),    label: days.value === 1 ? 'dia'    : 'dias'    },
  { value: pad(hours.value),   label: hours.value === 1 ? 'hora'  : 'horas'  },
  { value: pad(minutes.value), label: 'minutos' },
  { value: pad(seconds.value), label: 'segundos' },
])

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function tick() {
  const now  = Date.now()
  const diff = WEDDING.getTime() - now

  if (diff <= 0) {
    isToday.value = true
    days.value = hours.value = minutes.value = seconds.value = 0
    return
  }

  days.value    = Math.floor(diff / 86_400_000)
  hours.value   = Math.floor((diff % 86_400_000) / 3_600_000)
  minutes.value = Math.floor((diff % 3_600_000)  / 60_000)
  seconds.value = Math.floor((diff % 60_000)      / 1_000)
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>


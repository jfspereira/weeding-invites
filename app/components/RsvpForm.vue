<template>
  <div class="w-full max-w-xl mx-auto">

    <!-- Deadline passed -->
    <div
      v-if="deadlinePassed"
      class="text-center py-10 px-6 bg-champagne-50 rounded border border-champagne-200"
    >
      <p class="font-display text-2xl text-stone-600 mb-2">Prazo encerrado</p>
      <p class="font-body text-stone-500 text-sm">
        O prazo de confirmação de presença encerrou a 19 de Agosto de 2026.<br/>
        Para esclarecimentos, por favor contacte-nos directamente.
      </p>
    </div>

    <!-- Success message -->
    <Transition name="fade">
      <div
        v-if="successMessage"
        class="text-center py-10 px-6 bg-champagne-50 rounded border border-champagne-200"
      >
        <div class="text-4xl mb-4">💛</div>
        <p class="font-display text-2xl text-stone-700 mb-3">Obrigado!</p>
        <p class="font-body text-stone-500 leading-relaxed">{{ successMessage }}</p>
        <p class="font-display text-champagne-500 mt-4 text-sm tracking-widest">
          A vossa presença é o nosso maior presente.
        </p>

        <!-- Add to Calendar — only for attending guests -->
        <div v-if="wasAttending" class="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            :href="googleCalendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-champagne-300 text-champagne-700 font-body text-xs tracking-widest uppercase rounded-full hover:bg-champagne-100 transition"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="1.5" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            Google Calendar
          </a>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-champagne-300 text-champagne-700 font-body text-xs tracking-widest uppercase rounded-full hover:bg-champagne-100 transition"
            @click="downloadIcs"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v13m0 0l-4-4m4 4l4-4M5 20h14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Guardar no calendário
          </button>
        </div>
      </div>
    </Transition>

    <!-- RSVP Form -->
    <form
      v-if="!deadlinePassed && !successMessage"
      class="space-y-6"
      @submit.prevent="submitRsvp"
    >
      <!-- Guest names -->
      <div class="space-y-3">
        <label class="block font-display text-stone-600 text-lg tracking-wide">
          Nome(s) dos convidados
        </label>
        <div
          v-for="(_, i) in guestNames"
          :key="i"
          class="flex gap-2 items-center"
        >
          <input
            v-model="guestNames[i]"
            type="text"
            :placeholder="`Nome completo${i === 0 ? '' : ' — acompanhante'}`"
            required
            class="flex-1 border border-champagne-200 rounded px-4 py-3 font-body text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-champagne-300 placeholder-stone-300 transition"
          />
          <button
            v-if="i > 0"
            type="button"
            class="text-champagne-400 hover:text-red-400 transition text-xl leading-none"
            aria-label="Remover acompanhante"
            @click="removeGuest(i)"
          >
            ×
          </button>
        </div>
        <button
          type="button"
          class="flex items-center gap-2 text-champagne-500 hover:text-champagne-700 font-body text-sm transition"
          @click="addGuest"
        >
          <span class="text-lg leading-none">+</span> Adicionar acompanhante
        </button>
      </div>

      <!-- Attendance — pill toggle cards -->
      <div class="space-y-2">
        <label class="block font-display text-stone-600 text-lg tracking-wide">
          Confirmação
        </label>
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            :class="[
              'flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border-2 font-body text-sm transition cursor-pointer text-left',
              isAttending
                ? 'border-champagne-400 bg-champagne-50 text-stone-700'
                : 'border-stone-200 bg-white text-stone-400 hover:border-champagne-200',
            ]"
            @click="isAttending = true"
          >
            <span :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition', isAttending ? 'border-champagne-500 bg-champagne-500' : 'border-stone-300']">
              <svg v-if="isAttending" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            Confirmar presença
          </button>
          <button
            type="button"
            :class="[
              'flex-1 flex items-center gap-3 px-4 py-3 rounded-lg border-2 font-body text-sm transition cursor-pointer text-left',
              !isAttending
                ? 'border-stone-400 bg-stone-50 text-stone-600'
                : 'border-stone-200 bg-white text-stone-400 hover:border-stone-300',
            ]"
            @click="isAttending = false"
          >
            <span :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition', !isAttending ? 'border-stone-500 bg-stone-500' : 'border-stone-300']">
              <svg v-if="!isAttending" class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            Lamentavelmente não posso comparecer
          </button>
        </div>
      </div>

      <!-- Phone -->
      <div class="space-y-1">
        <label for="phone" class="block font-display text-stone-600 text-lg tracking-wide">
          Número de telefone
        </label>
        <input
          id="phone"
          v-model="phoneNumber"
          type="tel"
          placeholder="+351 912 345 678"
          class="w-full border border-champagne-200 rounded px-4 py-3 font-body text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-champagne-300 placeholder-stone-300 transition"
        />
      </div>

      <!-- Dietary restrictions -->
      <div class="space-y-1">
        <label for="dietary" class="block font-display text-stone-600 text-lg tracking-wide">
          Restrições alimentares / Alergias
          <span class="font-body text-xs text-stone-400 ml-1">(opcional)</span>
        </label>
        <textarea
          id="dietary"
          v-model="dietaryRestrictions"
          rows="3"
          placeholder="Informe-nos de qualquer restrição alimentar ou alergia"
          class="w-full border border-champagne-200 rounded px-4 py-3 font-body text-sm text-stone-700 bg-white focus:outline-none focus:ring-2 focus:ring-champagne-300 placeholder-stone-300 transition resize-none"
        />
      </div>

      <!-- Error -->
      <p v-if="errorMessage" class="text-red-500 text-sm font-body text-center">
        {{ errorMessage }}
      </p>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 px-8 bg-champagne-500 hover:bg-champagne-600 disabled:opacity-50 text-white font-display text-lg tracking-widest uppercase rounded transition duration-200 shadow-md hover:shadow-lg"
      >
        <span v-if="loading">A enviar…</span>
        <span v-else>Confirmar Presença</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const DEADLINE = new Date('2026-08-19T23:59:59Z')
const deadlinePassed = computed(() => new Date() > DEADLINE)

const guestNames          = ref<string[]>([''])
const isAttending         = ref<boolean>(true)
const phoneNumber         = ref('')
const dietaryRestrictions = ref('')
const loading             = ref(false)
const errorMessage        = ref('')
const successMessage      = ref('')
const wasAttending        = ref(false)

const googleCalendarUrl = computed(() => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Casamento Jorge & Beatriz',
    dates: '20260919T150000Z/20260920T030000Z',
    details: 'Aquário Eventos, R. da Estrada Velha, 4480-180 Árvore, Vila do Conde',
    location: 'Aquário Eventos, Árvore, Vila do Conde',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
})

function downloadIcs() {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Jorge & Beatriz//Wedding//PT',
    'BEGIN:VEVENT',
    'UID:wedding-jorge-beatriz-2026@invitation',
    'DTSTART:20260919T143000Z',
    'DTEND:20260920T030000Z',
    'SUMMARY:Casamento Jorge & Beatriz',
    'LOCATION:Aquário Eventos\\, R. da Estrada Velha\\, 4480-180 Árvore\\, Vila do Conde',
    'DESCRIPTION:Celebração do casamento de Jorge e Beatriz.',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'casamento-jorge-beatriz.ics'
  a.click()
  URL.revokeObjectURL(url)
}

function addGuest() {
  guestNames.value.push('')
}

function removeGuest(i: number) {
  guestNames.value.splice(i, 1)
}

async function submitRsvp() {
  errorMessage.value = ''
  loading.value = true

  try {
    const data = await $fetch('/api/rsvp', {
      method: 'POST',
      body: {
        guestNames: guestNames.value.filter((n) => n.trim()),
        isAttending: isAttending.value,
        phoneNumber: phoneNumber.value,
        dietaryRestrictions: dietaryRestrictions.value,
      },
    })
    wasAttending.value = isAttending.value
    successMessage.value = (data as { message: string }).message
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    errorMessage.value =
      e?.data?.message ?? 'Ocorreu um erro. Por favor tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>

<template>
  <div class="w-full max-w-xl mx-auto">

    <!-- Deadline passed -->
    <div
      v-if="deadlinePassed"
      class="text-center py-10 px-6 bg-champagne-50 rounded border border-champagne-200"
    >
      <p class="font-display text-2xl text-stone-600 mb-2">Prazo encerrado</p>
      <p class="font-body text-stone-500 text-sm">
        O prazo de confirmação de presença encerrou a 19 de Junho de 2026.<br/>
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

      <!-- Attendance -->
      <div class="space-y-2">
        <label class="block font-display text-stone-600 text-lg tracking-wide">
          Confirmação
        </label>
        <div class="flex flex-col sm:flex-row gap-3">
          <label class="flex items-center gap-3 cursor-pointer group">
            <input
              v-model="isAttending"
              type="radio"
              :value="true"
              class="accent-champagne-500 w-4 h-4"
            />
            <span class="font-body text-sm text-stone-600 group-hover:text-stone-800 transition">
              ✓ &nbsp;Confirmar presença
            </span>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group">
            <input
              v-model="isAttending"
              type="radio"
              :value="false"
              class="accent-champagne-500 w-4 h-4"
            />
            <span class="font-body text-sm text-stone-500 group-hover:text-stone-800 transition">
              ✗ &nbsp;Lamentavelmente não posso comparecer
            </span>
          </label>
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
        <span v-else>Confirmar</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
// RSVP deadline: 19 June 2026
const DEADLINE = new Date('2026-06-19T23:59:59Z')
const deadlinePassed = computed(() => new Date() > DEADLINE)

const guestNames        = ref<string[]>([''])
const isAttending       = ref<boolean>(true)
const phoneNumber       = ref('')
const dietaryRestrictions = ref('')
const loading           = ref(false)
const errorMessage      = ref('')
const successMessage    = ref('')

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


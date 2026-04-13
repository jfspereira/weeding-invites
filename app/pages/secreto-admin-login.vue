<template>
  <main class="min-h-screen bg-stone-50 flex items-center justify-center px-4">
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md p-8">

      <h1 class="font-display text-3xl text-stone-700 text-center mb-1">Área Restrita</h1>
      <p class="font-body text-stone-400 text-xs text-center tracking-widest mb-8 uppercase">
        Jorge &amp; Beatriz · Painel de Administração
      </p>

      <form class="space-y-5" @submit.prevent="login">
        <div>
          <label for="username" class="block font-body text-sm text-stone-500 mb-1">
            Utilizador
          </label>
          <input
            id="username"
            v-model="username"
            type="text"
            required
            autocomplete="username"
            class="w-full border border-stone-200 rounded px-4 py-2.5 font-body text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-champagne-300 transition"
          />
        </div>

        <div>
          <label for="password" class="block font-body text-sm text-stone-500 mb-1">
            Palavra-passe
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            class="w-full border border-stone-200 rounded px-4 py-2.5 font-body text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-champagne-300 transition"
          />
        </div>

        <p v-if="error" class="text-red-500 text-xs font-body text-center">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 bg-champagne-500 hover:bg-champagne-600 disabled:opacity-50 text-white font-display tracking-widest uppercase text-sm rounded transition"
        >
          {{ loading ? 'A entrar…' : 'Entrar' }}
        </button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const loading  = ref(false)
const error    = ref('')

async function login() {
  error.value   = ''
  loading.value = true
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })
    await navigateTo('/secreto-admin-dashboard')
  } catch (err: unknown) {
    const e = err as { data?: { message?: string } }
    error.value = e?.data?.message ?? 'Erro ao autenticar. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>


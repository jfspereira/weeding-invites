<template>
  <main class="min-h-screen bg-stone-50 py-12 px-4">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1 class="font-display text-3xl text-stone-700">Painel de Administração</h1>
          <p class="font-body text-stone-400 text-sm mt-1">Jorge &amp; Beatriz · 19 de Setembro de 2026</p>
        </div>
        <button
          class="font-body text-sm text-stone-400 hover:text-red-500 transition"
          @click="logout"
        >
          Terminar sessão →
        </button>
      </div>

      <!-- Summary cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div class="bg-white rounded-lg shadow-sm border border-stone-100 p-6 text-center">
          <p class="font-body text-xs text-stone-400 tracking-widest uppercase mb-2">Total Confirmados</p>
          <p class="font-display text-5xl text-green-600">{{ stats.attending }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-stone-100 p-6 text-center">
          <p class="font-body text-xs text-stone-400 tracking-widest uppercase mb-2">Total Recusados</p>
          <p class="font-display text-5xl text-red-400">{{ stats.notAttending }}</p>
        </div>
        <div class="bg-white rounded-lg shadow-sm border border-stone-100 p-6 text-center">
          <p class="font-body text-xs text-stone-400 tracking-widest uppercase mb-2">Total de Convidados</p>
          <p class="font-display text-5xl text-champagne-600">{{ stats.total }}</p>
        </div>
      </div>

      <!-- Error -->
      <p v-if="fetchError" class="text-red-500 text-sm font-body mb-4">{{ fetchError }}</p>

      <!-- Submissions table -->
      <div class="bg-white rounded-lg shadow-sm border border-stone-100 overflow-x-auto">
        <table class="w-full text-sm font-body">
          <thead class="bg-stone-50 border-b border-stone-100">
            <tr>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Nome</th>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Grupo</th>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Presença</th>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Telefone</th>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Restrições</th>
              <th class="text-left px-4 py-3 text-stone-500 font-medium tracking-wide text-xs uppercase">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="submissions.length === 0"
              class="text-center text-stone-400"
            >
              <td colspan="6" class="py-10">Sem confirmações ainda.</td>
            </tr>
            <tr
              v-for="row in submissions"
              :key="row.id"
              class="border-t border-stone-50 hover:bg-stone-50 transition"
            >
              <td class="px-4 py-3 text-stone-700 font-medium">{{ row.guestName }}</td>
              <td class="px-4 py-3 text-stone-400 text-xs font-mono">{{ row.submissionGroupId.slice(0, 8) }}…</td>
              <td class="px-4 py-3">
                <span
                  :class="row.isAttending
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'"
                  class="px-2 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ row.isAttending ? 'Confirmado' : 'Recusado' }}
                </span>
              </td>
              <td class="px-4 py-3 text-stone-500">{{ row.phoneNumber ?? '—' }}</td>
              <td class="px-4 py-3 text-stone-500 max-w-xs truncate">{{ row.dietaryRestrictions || '—' }}</td>
              <td class="px-4 py-3 text-stone-400 text-xs">{{ formatDate(row.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import type { RsvpSubmission } from '../../server/db/schema'

definePageMeta({
  layout: false,
  middleware: ['admin-auth'],
})

const submissions = ref<RsvpSubmission[]>([])
const fetchError  = ref('')

const stats = computed(() => ({
  attending:    submissions.value.filter((r) => r.isAttending).length,
  notAttending: submissions.value.filter((r) => !r.isAttending).length,
  total:        submissions.value.length,
}))

function formatDate(val: string | null) {
  if (!val) return '—'
  return new Date(val).toLocaleString('pt-PT', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/secreto-admin-login')
}

// Fetch on mount
onMounted(async () => {
  try {
    const data = await $fetch<RsvpSubmission[]>('/api/admin/submissions')
    submissions.value = data
  } catch {
    fetchError.value = 'Erro ao carregar as confirmações. Verifique as suas credenciais.'
  }
})
</script>


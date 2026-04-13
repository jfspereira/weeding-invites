<template>
  <div>
    <!-- Envelope intro — shown until user triggers the opening -->
    <EnvelopeAnimation
      v-if="!envelopeOpened"
      @opened="envelopeOpened = true"
    />

    <!-- Main site — slides in after envelope is opened -->
    <Transition name="page-reveal">
      <div v-if="envelopeOpened" class="min-h-screen bg-ivory">
        <NuxtPage />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const envelopeOpened = ref(false)

// Skip animation on admin routes
const route = useRoute()
if (route.path.startsWith('/secreto-admin')) {
  envelopeOpened.value = true
}

watch(
  () => route.path,
  (p) => {
    if (p.startsWith('/secreto-admin')) envelopeOpened.value = true
  },
)
</script>

<style>
.page-reveal-enter-active {
  transition: opacity 1.2s ease, transform 1.2s ease;
}
.page-reveal-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>

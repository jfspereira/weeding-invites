<template>
  <main class="bg-ivory">

    <!-- ── HERO ─────────────────────────────────────────────── -->
    <section class="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">

      <!-- Photo gallery background -->
      <div class="absolute inset-0 z-0">
        <PhotoGallery />
      </div>

      <!-- Hero content -->
      <div class="relative z-20 text-center px-6 animate-fade-in">
        <p class="font-display text-white/80 tracking-[0.4em] uppercase text-xs md:text-sm mb-4">
          Convidados a celebrar
        </p>

        <h1 class="font-display font-light text-white text-6xl md:text-8xl lg:text-9xl leading-none drop-shadow-lg">
          Jorge
          <span class="block text-champagne-300 text-5xl md:text-7xl lg:text-8xl my-2">&amp;</span>
          Beatriz
        </h1>

        <div class="ornament mt-8 mb-6 mx-auto w-48 text-white/40 text-sm">✦</div>

        <p class="font-display text-white/90 text-xl md:text-2xl tracking-[0.25em] mb-1">
          19 de Setembro de 2026
        </p>
        <p class="font-display text-champagne-300 text-lg md:text-xl tracking-[0.3em]">
          16:00h
        </p>
      </div>

      <!-- Countdown -->
      <div class="relative z-20 mt-10 animate-slide-up">
        <CountdownTimer />
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 z-20 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- ── VENUE ──────────────────────────────────────────────── -->
    <section class="py-24 px-6 bg-white text-center">
      <div class="max-w-2xl mx-auto">
        <p class="font-body text-champagne-400 tracking-[0.35em] uppercase text-xs mb-6">
          Local da Cerimónia
        </p>

        <div class="ornament mb-8 text-champagne-200 text-base">✦</div>

        <h2 class="font-display text-4xl md:text-5xl text-stone-700 mb-3">
          Vilar Oporto Hotel
        </h2>
        <p class="font-body text-stone-400 text-sm tracking-wide mb-2">
          Rua Júlio Dinis, 1000 · Porto, Portugal
        </p>
        <p class="font-display text-champagne-500 text-xl tracking-widest mb-10">
          19 · IX · MMXXVI &nbsp;·&nbsp; 16:00h
        </p>

        <!-- OpenStreetMap embed -->
        <div class="rounded-lg overflow-hidden shadow-lg border border-champagne-100">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-8.6393%2C41.1555%2C-8.6093%2C41.1705&layer=mapnik&marker=41.1630%2C-8.6243"
            width="100%"
            height="380"
            frameborder="0"
            style="border:0"
            allowfullscreen
            loading="lazy"
            title="Localização do Vilar Oporto Hotel"
            aria-label="Mapa do Vilar Oporto Hotel"
          />
        </div>

        <a
          href="https://www.openstreetmap.org/?mlat=41.1630&mlon=-8.6243#map=15/41.1630/-8.6243"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block mt-4 font-body text-xs text-champagne-500 hover:text-champagne-700 underline underline-offset-4 transition"
        >
          Abrir no mapa →
        </a>
      </div>
    </section>

    <!-- ── DETAILS ─────────────────────────────────────────────── -->
    <section class="py-20 px-6 bg-champagne-50 text-center">
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">🕓</span>
          <h3 class="font-display text-xl text-stone-700">Hora</h3>
          <p class="font-body text-stone-500 text-sm leading-relaxed">
            A cerimónia começa às <strong class="text-stone-700">16:00h</strong>.<br/>
            Pedimos pontualidade.
          </p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">🌹</span>
          <h3 class="font-display text-xl text-stone-700">Código de Vestuário</h3>
          <p class="font-body text-stone-500 text-sm leading-relaxed">
            Traje formal.<br/>Tons claros são bem-vindos.
          </p>
        </div>

        <div class="flex flex-col items-center gap-3">
          <span class="text-3xl">📅</span>
          <h3 class="font-display text-xl text-stone-700">Confirmação</h3>
          <p class="font-body text-stone-500 text-sm leading-relaxed">
            Por favor confirme a sua presença<br/>
            até <strong class="text-stone-700">19 de Junho de 2026</strong>.
          </p>
        </div>

      </div>
    </section>

    <!-- ── RSVP ───────────────────────────────────────────────── -->
    <section id="rsvp" class="py-24 px-6 bg-white">
      <div class="max-w-xl mx-auto text-center mb-12">
        <p class="font-body text-champagne-400 tracking-[0.35em] uppercase text-xs mb-4">
          Formulário de confirmação
        </p>
        <div class="ornament mb-6 text-champagne-200 text-base">✦</div>
        <h2 class="font-display text-4xl md:text-5xl text-stone-700 mb-4">
          Confirme a sua Presença
        </h2>
        <p class="font-body text-stone-400 text-sm leading-relaxed">
          Ficamos gratos pela sua confirmação até <strong>19 de Junho de 2026</strong>.<br/>
          A vossa companhia é o nosso maior presente.
        </p>
      </div>

      <RsvpForm />
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────── -->
    <footer class="bg-stone-800 text-white/60 py-10 text-center">
      <p class="font-display text-2xl text-white mb-2">Jorge &amp; Beatriz</p>
      <p class="font-body text-xs tracking-widest">19 · IX · MMXXVI · Porto</p>
      <div class="ornament mt-6 w-32 mx-auto text-white/20 text-xs">✦</div>
    </footer>

  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Jorge & Beatriz — 19 de Setembro de 2026',
  meta: [
    {
      name: 'description',
      content:
        'Celebre connosco o nosso casamento a 19 de Setembro de 2026 no Vilar Oporto Hotel, Porto.',
    },
    { name: 'robots', content: 'noindex, nofollow' },
  ],
  htmlAttrs: { lang: 'pt' },
})
</script>


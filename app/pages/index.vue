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
          <span class="block text-champagne-200 text-5xl md:text-7xl lg:text-8xl my-2">&amp;</span>
          Beatriz
        </h1>

        <div class="ornament mt-8 mb-6 mx-auto w-48 text-white/40 text-sm">✦ &nbsp; ✦ &nbsp; ✦</div>

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
        <span class="font-display text-xs tracking-[0.3em] uppercase">Descobrir</span>
      </div>
    </section>

    <!-- ── VENUE ──────────────────────────────────────────────── -->
    <section class="py-24 px-6 bg-white text-center">
      <div class="max-w-2xl mx-auto">
        <p data-reveal class="font-body text-champagne-400 tracking-[0.35em] uppercase text-xs mb-6">
          Local da Cerimónia
        </p>

        <div data-reveal data-reveal-delay="100" class="ornament mb-8 text-champagne-200 text-base">✦ &nbsp; ✦ &nbsp; ✦</div>

        <h2 data-reveal data-reveal-delay="150" class="font-display text-4xl md:text-5xl text-stone-700 mb-3">
          Aquário Eventos
        </h2>
        <p data-reveal data-reveal-delay="200" class="font-body text-stone-400 text-sm tracking-wide mb-2">
          R. da Estrada Velha · 4480-180 Árvore, Vila do Conde
        </p>
        <p data-reveal data-reveal-delay="250" class="font-display text-champagne-500 text-xl tracking-widest mb-10">
          19 · 09 · 2026 &nbsp;·&nbsp; 16:00h
        </p>

        <!-- OpenStreetMap embed -->
        <div data-reveal data-reveal-delay="300" class="rounded-xl overflow-hidden shadow-xl border border-champagne-100">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-8.7100%2C41.3550%2C-8.6800%2C41.3750&layer=mapnik&marker=41.3650%2C-8.6950"
            width="100%"
            height="380"
            frameborder="0"
            style="border:0"
            allowfullscreen
            loading="lazy"
            title="Localização do Aquário Eventos"
            aria-label="Mapa do Aquário Eventos"
          />
        </div>

        <a
          href="https://maps.app.goo.gl/xVR76ih1nEkc9Qym7"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 mt-6 px-6 py-2.5 border border-champagne-300 text-champagne-600 font-body text-xs tracking-widest uppercase rounded-full hover:bg-champagne-50 transition"
        >
          <!-- Map pin icon -->
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2C8.686 2 6 4.686 6 8c0 4.418 6 13 6 13s6-8.582 6-13c0-3.314-2.686-6-6-6z" />
            <circle cx="12" cy="8" r="2" stroke-width="2" />
          </svg>
          Abrir no mapa
        </a>
      </div>
    </section>

    <!-- ── DETAILS ─────────────────────────────────────────────── -->
    <section class="py-20 px-6 bg-champagne-50 text-center">
      <div class="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">

        <div data-reveal class="flex flex-col items-center gap-3 max-w-xs">
          <!-- Clock icon -->
          <svg class="w-8 h-8 text-champagne-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" stroke-width="1.5" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7v5l3 3" />
          </svg>
          <h3 class="font-display text-xl text-stone-700">Hora</h3>
          <p class="font-body text-stone-500 text-sm leading-relaxed">
            A cerimónia começa às <strong class="text-stone-700">16:00h</strong>.<br/>
            Pedimos pontualidade.
          </p>
        </div>

        <div data-reveal data-reveal-delay="100" class="flex flex-col items-center gap-3 max-w-xs">
          <!-- Calendar icon -->
          <svg class="w-8 h-8 text-champagne-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke-width="1.5" />
            <path stroke-linecap="round" stroke-width="1.5" d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          <h3 class="font-display text-xl text-stone-700">Confirmação</h3>
          <p class="font-body text-stone-500 text-sm leading-relaxed">
            Por favor confirme a sua presença<br/>
            até <strong class="text-stone-700">19 de Junho de 2026</strong>.
          </p>
        </div>

      </div>
    </section>

    <!-- ── PROGRAMME ──────────────────────────────────────────── -->
    <section class="py-24 px-6 bg-white text-center">
      <div class="max-w-2xl mx-auto">
        <p data-reveal class="font-body text-champagne-400 tracking-[0.35em] uppercase text-xs mb-6">
          Programa do Dia
        </p>
        <div data-reveal data-reveal-delay="100" class="ornament mb-12 text-champagne-200 text-base">✦ &nbsp; ✦ &nbsp; ✦</div>

        <!-- Timeline -->
        <div class="relative">
          <!-- Vertical center line -->
          <div class="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-champagne-200 hidden md:block" />

          <div class="space-y-10 md:space-y-0">

            <!-- Cerimónia -->
            <div data-reveal class="relative flex flex-col md:flex-row md:items-center md:gap-0">
              <div class="md:w-1/2 md:pr-12 md:text-right flex flex-col items-center md:items-end gap-1 mb-3 md:mb-0">
                <p class="font-display text-2xl text-stone-700">16:00</p>
                <p class="font-body text-stone-500 text-sm">Cerimónia</p>
              </div>
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-champagne-300 items-center justify-center z-10">
                <!-- Rings / heart icon -->
                <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </div>
              <div class="md:w-1/2 md:pl-12 md:text-left hidden md:block" />
              <!-- Mobile icon -->
              <div class="flex md:hidden justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-champagne-300 flex items-center justify-center">
                  <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Aperitivos -->
            <div data-reveal data-reveal-delay="100" class="relative flex flex-col md:flex-row md:items-center md:gap-0 md:pt-12">
              <div class="md:w-1/2 md:pr-12 md:text-right hidden md:block" />
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-champagne-300 items-center justify-center z-10">
                <!-- Champagne glass icon -->
                <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 3h8l-2 9H10L8 3zM10 12l-1 6m5-6l1 6M7 18h10" />
                </svg>
              </div>
              <div class="md:w-1/2 md:pl-12 md:text-left flex flex-col items-center md:items-start gap-1 mb-3 md:mb-0">
                <p class="font-display text-2xl text-stone-700">17:30</p>
                <p class="font-body text-stone-500 text-sm">Aperitivos</p>
              </div>
              <!-- Mobile icon -->
              <div class="flex md:hidden justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-champagne-300 flex items-center justify-center">
                  <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 3h8l-2 9H10L8 3zM10 12l-1 6m5-6l1 6M7 18h10" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Jantar -->
            <div data-reveal data-reveal-delay="200" class="relative flex flex-col md:flex-row md:items-center md:gap-0 md:pt-12">
              <div class="md:w-1/2 md:pr-12 md:text-right flex flex-col items-center md:items-end gap-1 mb-3 md:mb-0">
                <p class="font-display text-2xl text-stone-700">20:00</p>
                <p class="font-body text-stone-500 text-sm">Jantar</p>
              </div>
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-champagne-300 items-center justify-center z-10">
                <!-- Fork & knife icon -->
                <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3v5a4 4 0 004 4v9M17 3v18M14 3a3 3 0 013 3v3h-3" />
                </svg>
              </div>
              <div class="md:w-1/2 md:pl-12 hidden md:block" />
              <div class="flex md:hidden justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-champagne-300 flex items-center justify-center">
                  <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3v5a4 4 0 004 4v9M17 3v18M14 3a3 3 0 013 3v3h-3" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Festa -->
            <div data-reveal data-reveal-delay="300" class="relative flex flex-col md:flex-row md:items-center md:gap-0 md:pt-12">
              <div class="md:w-1/2 md:pr-12 hidden md:block" />
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-champagne-300 items-center justify-center z-10">
                <!-- Music note icon -->
                <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" stroke-width="1.5" />
                  <circle cx="18" cy="16" r="3" stroke-width="1.5" />
                </svg>
              </div>
              <div class="md:w-1/2 md:pl-12 md:text-left flex flex-col items-center md:items-start gap-1 mb-3 md:mb-0">
                <p class="font-display text-2xl text-stone-700">23:00</p>
                <p class="font-body text-stone-500 text-sm">Festa</p>
              </div>
              <div class="flex md:hidden justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-champagne-300 flex items-center justify-center">
                  <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" stroke-width="1.5" />
                    <circle cx="18" cy="16" r="3" stroke-width="1.5" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Boa noite -->
            <div data-reveal data-reveal-delay="400" class="relative flex flex-col md:flex-row md:items-center md:gap-0 md:pt-12">
              <div class="md:w-1/2 md:pr-12 md:text-right flex flex-col items-center md:items-end gap-1 mb-3 md:mb-0">
                <p class="font-display text-2xl text-stone-700">~04:00</p>
                <p class="font-body text-stone-500 text-sm">Boa noite</p>
              </div>
              <div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-champagne-300 items-center justify-center z-10">
                <!-- Moon icon -->
                <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                </svg>
              </div>
              <div class="md:w-1/2 md:pl-12 hidden md:block" />
              <div class="flex md:hidden justify-center mb-2">
                <div class="w-10 h-10 rounded-full bg-white border-2 border-champagne-300 flex items-center justify-center">
                  <svg class="w-5 h-5 text-champagne-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

    <!-- ── RSVP ───────────────────────────────────────────────── -->
    <section id="rsvp" class="py-24 px-6 bg-champagne-50">
      <div class="max-w-xl mx-auto text-center mb-12">
        <p data-reveal class="font-body text-champagne-400 tracking-[0.35em] uppercase text-xs mb-4">
          Formulário de confirmação
        </p>
        <div data-reveal data-reveal-delay="100" class="ornament mb-6 text-champagne-200 text-base">✦ &nbsp; ✦ &nbsp; ✦</div>
        <h2 data-reveal data-reveal-delay="150" class="font-display text-4xl md:text-5xl text-stone-700 mb-4">
          Confirme a sua Presença
        </h2>
        <p data-reveal data-reveal-delay="200" class="font-body text-stone-400 text-sm leading-relaxed">
          Ficamos gratos pela sua confirmação até <strong>19 de Junho de 2026</strong>.<br/>
          A vossa companhia é o nosso maior presente.
        </p>
      </div>

      <RsvpForm />
    </section>

    <!-- ── FOOTER ─────────────────────────────────────────────── -->
    <footer class="bg-stone-800 text-white/60 py-10 text-center">
      <div class="ornament mb-8 max-w-xs mx-auto text-white/20 text-xs">✦ &nbsp; ✦ &nbsp; ✦</div>
      <p class="font-display text-2xl text-white mb-2">Jorge &amp; Beatriz</p>
      <p class="font-body text-xs tracking-widest">19 · 09 · 2026 · Árvore</p>
      <div class="ornament mt-6 w-32 mx-auto text-white/20 text-xs">✦</div>
    </footer>

  </main>
</template>

<script setup lang="ts">
useScrollReveal()

useHead({
  title: 'Jorge & Beatriz — 19 de Setembro de 2026',
  meta: [
    {
      name: 'description',
      content:
        'Celebre connosco o nosso casamento a 19 de Setembro de 2026 no Aquário Eventos, Árvore, Vila do Conde.',
    },
    { name: 'robots', content: 'noindex, nofollow' },
    { property: 'og:title', content: 'Jorge & Beatriz — 19 de Setembro de 2026' },
    {
      property: 'og:description',
      content:
        'Celebre connosco o nosso casamento a 19 de Setembro de 2026 no Aquário Eventos, Árvore, Vila do Conde.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/images/photo-1.jpg' },
    { property: 'og:locale', content: 'pt_PT' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Jorge & Beatriz — 19 de Setembro de 2026' },
    { name: 'twitter:image', content: '/images/photo-1.jpg' },
  ],
  htmlAttrs: { lang: 'pt' },
})
</script>

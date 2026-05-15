export function useScrollReveal() {
  onMounted(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.revealDelay ?? '0'
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 },
    )

    elements.forEach((el) => observer.observe(el))

    onUnmounted(() => observer.disconnect())
  })
}

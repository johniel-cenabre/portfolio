const FadeStagger = {
  template: require('./fade-stagger.html').default,
  props: [
    'delayInterval',
    'listContainerTag',
    'animationMode'
  ],
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      const delay = el.dataset.index * this.delayInterval
      setTimeout(() => Velocity(el,
        { opacity: 1 },
        { complete: done }
      ), delay)
    },
    leave: function (el, done) {
      const delay = el.dataset.index * this.delayInterval
      setTimeout(() => Velocity(el,
        { opacity: 0 },
        { complete: done }
      ), delay)
    }
  }
}

export default FadeStagger

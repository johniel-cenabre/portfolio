import './carousel.css'

const Carousel = {
  template: require('./carousel.html').default,
  props: [
    'tabbed',
    'auto',
    'timer',
    'list'
  ],
  data() {
    return {
      currentViewIndex: 0,
      timeout: null,
      interval: null
    }
  },
  methods: {
    showViewTab(index) {
      if (this.currentViewIndex !== index) {
        this.currentViewIndex = index
      }
    },
    showPrevious() {
      this.currentViewIndex--
      if (!this.list[this.currentViewIndex]) {
        this.currentViewIndex = this.list.length - 1
      }
    },
    showNext() {
      this.currentViewIndex++
      if (!this.list[this.currentViewIndex]) {
        this.currentViewIndex = 0
      }
    },
    pause() {
      clearTimeout(this.timeout)
      clearInterval(this.interval)
    },
    play() {
      if (this.auto) {
        this.pause()
        this.timeout = setTimeout(() => {
          this.interval = setInterval(this.showNext(), this.timerSeconds)
        }, this.timerSeconds)
      }
    }
  },
  mounted: function () {
    this.$nextTick(() => this.play())
  },
  updated: function () {
    this.$nextTick(() => this.play())
  },
  beforeUnmount: function () {
    this.$nextTick(() => this.pause())
  },
  computed: {
    currentView: function () {
      return this.list[this.currentViewIndex]
    },
    timerSeconds: function () {
      return (this.timer || 3) * 1000
    }
  }
}

export default Carousel

import './toggle.css'

const Toggle = {
  template: require('./toggle.html').default,
  props: [
    'onText',
    'offText',
    'onValue',
    'offValue',
    'on',
    'onChange'
  ],
  data() {
    return {
      isOn: this.on || false
    }
  },
  methods: {
    toggle() {
      this.isOn = !this.isOn
      this.onChange && this.onChange(this.value)
    }
  },
  computed: {
    value: function () {
      return this.isOn ? (this.onValue || this.onText) : (this.offValue || this.offText)
    }
  }
}

export default Toggle

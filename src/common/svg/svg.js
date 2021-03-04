import { customizeSvg } from './svgs'

const Vsvg = {
  template: require('./svg.html').default,
  props: [
    'name',
    'width',
    'height',
    'strokeColor',
    'backgroundColor',
    'fillColor'
  ],
  computed: {
    svg: function () {
      return customizeSvg(
        this.name,
        this.width,
        this.height,
        this.strokeColor,
        this.backgroundColor,
        this.fillColor
      )
    }
  }
}

export default Vsvg

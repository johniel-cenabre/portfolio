import webdev from  '../../assets/img/webdev.jpg'
import webdes from  '../../assets/img/webdes.jpg'
import sofeng from  '../../assets/img/sofeng.jpg'

export const services = [
  {
    name: 'Fullstack Web Development',
    logo: 'stack',
    img: webdev
  },
  {
    name: 'Web Design',
    logo: 'layout',
    img: webdes
  },
  {
    name: 'Software Engineering',
    logo: 'gear',
    img: sofeng
  }
]

const Services = {
  template: require('./services.html').default,
  props: [
    'name',
    'width',
    'height',
    'strokeColor',
    'backgroundColor',
    'fillColor'
  ],
  data() {
    return {
      text: 'Services Component'
    }
  },
  methods: {
  },
  computed: {
    svg: function () {
      return svgs.customize(
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

export default Services

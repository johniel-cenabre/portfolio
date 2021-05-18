import { GOOGLE_DRIVE_IMG } from '../../constants/links'

export const services = [
  {
    name: 'Fullstack Web Development',
    logo: 'stack',
    img: GOOGLE_DRIVE_IMG+'1XBYx_mxT7Gz8HG_Shvbs8Gp9AWTQBSIX'
  },
  {
    name: 'Web Design',
    logo: 'layout',
    img: GOOGLE_DRIVE_IMG+'1TAembgPEUqnFks79aijNqt7VPtJZYSJM'
  },
  {
    name: 'Software Engineering',
    logo: 'gear',
    img: GOOGLE_DRIVE_IMG+'1t7aa9ykLvVXMnscK-qxwSI98VmqBaA2l'
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

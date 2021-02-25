import './home.css'
import { skills } from '../skills/skills'
import { services } from '../services/services'
import { projects } from '../projects/projects'

const Home = {
  template: require('./home.html').default,
  data() {
    return {
      position: 'Software Engineer',
      name: 'Johniel Judah Cenabre',
      skillsTitle: 'Skills',
      skillsList: [],
      servicesTitle: 'Services',
      servicesList: [],
      projectsTitle: 'Projects',
      featuredProjectsList: [],
      experienceTitle: 'Experience',
      experienceList: [],
      blogTitle: 'Blog',
      blogFeatured: []
    }
  },
  methods: {
    showAllSkills: function () {
      this.skillsList = skills
    },
    showAllServices: function () {
      this.servicesList = services
    },
    changeServicesBackground: function (img) {
      const servicesCard = this.$refs.servicesCard.$el
      const DEFAULT_GRADIENT = `linear-gradient(to right, var(--accent4), var(--accent5))`
      servicesCard.style.backgroundImage = img ? `url(${img})` : DEFAULT_GRADIENT
    },
    showFeaturedProjectsList: function () {
      this.featuredProjectsList = projects.filter(project => project.featured)
    }
  }
}

export default Home

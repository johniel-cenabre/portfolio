import './home.css'
import { skills } from '../skills/skills'
import { services } from '../services/services'
import { projects } from '../projects/projects'
import { experience } from '../experience/experience'

const Home = {
  template: require('./home.html').default,
  data() {
    return {
      position: 'Software Developer',
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
    showAllIfLarge() {
      if (window.innerWidth >= 1200) {
        this.showAllSkills()
        this.showAllServices()
        this.showFeaturedProjects()
        this.showAllExperience()
      }
    },
    showAllSkills() {
      this.skillsList = skills
    },
    showAllServices() {
      this.servicesList = services
    },
    changeServicesBackground(img) {
      const servicesCard = this.$refs.servicesCard.$el
      const DEFAULT_GRADIENT = `linear-gradient(to right, var(--accent4), var(--accent5))`
      servicesCard.style.backgroundImage = img ? `url(${img})` : DEFAULT_GRADIENT
    },
    showFeaturedProjects() {
      this.featuredProjectsList = projects.filter(project => project.featured)
    },
    showAllExperience() {
      this.experienceList = experience
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.showAllIfLarge)

      this.showAllIfLarge()
    })
  },
  beforeUnmount() {
    this.$nextTick(() => {
      window.removeEventListener('resize', this.showAllIfLarge)
    })
  }
}

export default Home

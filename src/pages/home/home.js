import './home.css'
import { profile } from '../profile/profile'
import { skills } from '../skills/skills'
import { services } from '../services/services'
import { projects } from '../projects/projects'
import { experience } from '../experience/experience'
import { blog } from '../blog/blog'

const Home = {
  template: require('./home.html').default,
  data() {
    return {
      profile,
      skillsTitle: 'Skills',
      skillsList: [],
      servicesTitle: 'Services',
      servicesList: [],
      projectsTitle: 'Projects',
      projectsList: [],
      experienceTitle: 'Experience',
      experienceList: [],
      blogTitle: 'Blog',
      blogList: []
    }
  },
  methods: {
    showAllIfLarge() {
      if (window.innerWidth >= 1200) {
        this.showAllSkills()
        this.showAllServices()
        this.showFeaturedProjects()
        this.showAllExperience()
        this.showfeaturedBlog()
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
      this.projectsList = projects
    },
    showAllExperience() {
      this.experienceList = experience
    },
    showfeaturedBlog() {
      this.blogList = blog
    }
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
  },
  computed: {
    featuredProjects: function () {
      return this.projectsList.filter(project => project.featured)
    },
    featuredBlog: function () {
      return this.blogList.filter(blog => blog.featured)
    }
  }
}

export default Home

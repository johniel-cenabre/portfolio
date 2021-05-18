import './home.css'
import { profile } from '../profile'
import { skills } from '../skills'
import { services } from '../services'
import { projects } from '../projects'
import { experience } from '../experience'
import { parseCsv, parseRow } from '../../util/csv-parser'
import {
  GOOGLE_DRIVE_IMG,
  GOOGLE_DRIVE_BLOG_CSV
} from '../../constants/links'
import {
  BLOG_COLUMNS,
  DATE_COLUMN,
  TITLE_COLUMN,
  INTRO_COLUMN,
  IMG_COLUMN,
  CONTENT_COLUMN,
  FEATURED_COLUMN
} from '../../constants/blog'

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
      blogList: [],
      blogs: []
    }
  },
  methods: {
    fetchBlogs() {
      fetch(GOOGLE_DRIVE_BLOG_CSV)
        .then(res => parseCsv(res))
        .then(rows => {
          this.blogs = rows.map(row => {
            const parsedRow = parseRow(row, BLOG_COLUMNS)
            return {
              id: parsedRow[CONTENT_COLUMN].replace(/^"|"$/g, ''),
              date: parsedRow[DATE_COLUMN].replace(/^"|"$/g, ''),
              title: parsedRow[TITLE_COLUMN].replace(/^"|"$/g, ''),
              intro: parsedRow[INTRO_COLUMN].replace(/^"|"$/g, ''),
              img: GOOGLE_DRIVE_IMG+parsedRow[IMG_COLUMN].replace(/^"|"$/g, ''),
              featured: parsedRow[FEATURED_COLUMN].replace(/^"|"$/g, '').toLowerCase() === 'true'
            }
          })

          this.showAllIfLarge()
        })
    },
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
      this.projectsList = this.featuredProjects
    },
    showAllExperience() {
      this.experienceList = experience
    },
    showfeaturedBlog() {
      this.blogList = this.featuredBlog
    }
  },
  created() {
    this.fetchBlogs()
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
      return projects.filter(project => project.featured)
    },
    featuredBlog: function () {
      return this.blogs.filter(blog => blog.featured)
    }
  }
}

export default Home

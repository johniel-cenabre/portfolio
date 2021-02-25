import Home from './pages/home/home'
import Blog from './pages/blog/blog'
// import Contact from './pages/contact'
// import Experience from './pages/experience'
// import Games from './pages/games'
// import Projects from './pages/projects'
// import Services from './pages/services'
// import Skills from './pages/skills'

const router = new VueRouter.createRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/blog',
      component: Blog
    },
    // {
    //   path: '/contact',
    //   component: Contact
    // },
    // {
    //   path: '/experience',
    //   component: Experience
    // },
    // {
    //   path: '/games',
    //   component: Games
    // },
    // {
    //   path: '/projects',
    //   component: Projects
    // },
    // {
    //   path: '/services',
    //   component: Services
    // },
    // {
    //   path: '/skills',
    //   component: Skills
    // },
  ],
  history: VueRouter.createWebHistory()
})

export default router

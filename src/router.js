import Home from './pages/home'
import Blog from './pages/blog'
// import Profile from './pages/profile'
// import Experience from './pages/experience'
// import Games from './pages/games'
// import Projects from './pages/projects'
// import Services from './pages/services'
// import Skills from './pages/skills'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
      props: true
    },
    // {
    //   path: '/profile',
    //   component: Profile
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
  scrollBehaviour() {
    return { x : 0, y: 0 }
  }
})

export default router

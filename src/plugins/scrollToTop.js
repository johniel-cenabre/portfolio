const scrollToTop = {
  install(app) {
    app.config.globalProperties.$scrollToTop = () => {
      window.scrollTo(0, 0)
    }
  }
}

export default scrollToTop

module.exports = {
  publicPath: '',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '~@/assets/sass/index.sass'`
      }
    }
  }
}
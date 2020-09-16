module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false
    }]
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
// {
//   presets: [
//     '@vue/cli-plugin-babel/preset'
//   ]
// }

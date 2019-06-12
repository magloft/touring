require('docsify')
require('docsify/themes/vue.css')
require('./index.css')
const touring = require('../../src/index.tsx').default
const tourConfig = require('./tour.json')

window.$docsify = {
  name: 'touring',
  repo: 'https://github.com/magloft/touring',
  logo: 'docs/assets/touring.svg',
  themeColor: '#178BF5',
  homepage: 'README.md',
  loadSidebar: 'docs/SIDEBAR.md',
  executeScript: true,
  variablesFile : 'docs/assets/variables.xml'
}

window.startTour = function() {
  tourConfig.context = window
  const tour = touring(tourConfig)
  tour.start()
}

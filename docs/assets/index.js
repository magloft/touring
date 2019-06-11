require('docsify')
require('docsify/themes/vue.css')
require('./index.css')
const touring = require('../../src/index.tsx').default

window.$docsify = {
  name: '@magloft/touring',
  repo: 'https://github.com/magloft/touring',
  logo: 'docs/assets/touring.svg',
  themeColor: '#178BF5',
  homepage: 'README.md',
  loadSidebar: 'docs/SIDEBAR.md',
  executeScript: true,
  variablesFile : 'docs/assets/variables.xml'
}

window.startTour = function() {
  const tour = touring({
    steps: [{
      id: 'intro',
      icon: 'docs/assets/feature.svg',
      title: 'TOURING DEMO',
      items: [
        { type: 'paragraph', value: 'Welcome to the Demo Tour! This tour was created using touring, I hope you enjoy!' },
        { type: 'hint', value: 'Get started by clicking the button below.' },
        { type: 'button', value: 'Start Tour', action: 'continue' }
      ]
    }, {
      id: 'intro',
      icon: 'docs/assets/feature.svg',
      title: 'TOURING DEMO',
      items: [
        { type: 'paragraph', value: 'Welcome to the Demo Tour! This tour was created using touring, I hope you enjoy!' },
        { type: 'hint', value: 'Click the touringJS logo to continue.' }
      ],
      selector: 'img[alt="@magloft/touring"]',
      listen: ['click']
    }, {
      id: 'heading',
      icon: 'docs/assets/feature.svg',
      title: 'SELECTORS',
      items: [
        { type: 'paragraph', value: 'You can point to any CSS selecters to highlight elements:' },
        { type: 'code', value: '{ selector: "h2" }' },
        { type: 'hint', value: 'Click on the heading to continue.' }
      ],
      selector: 'h2',
      listen: ['click']
    }, {
      id: 'github',
      icon: 'docs/assets/feature.svg',
      title: 'GITHUB',
      items: [
        { type: 'paragraph', value: 'You can learn more about touring on our GitHub page.' },
        { type: 'hint', value: 'Click the Octocat to continue.' }
      ],
      selector: '.github-corner',
      listen: ['click']
    }, {
      id: 'success',
      icon: 'docs/assets/feature.svg',
      title: 'COMPLETE',
      items: [
        { type: 'image', value: 'https://i.giphy.com/media/zxxufhpOTGhpe/giphy.webp' },
        { type: 'paragraph', value: 'Thanks for taking the tour!' },
        { type: 'hint', value: 'Complete the tour by clicking the button below.' },
        { type: 'button', value: 'Finish Tour', action: 'end' }
      ]
    }]
  })
  tour.start()
}

require('docsify')
require('docsify/themes/vue.css')
require('./index.css')
const touring = require('../../src/index.tsx').default

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
      title: 'ITEM TYPES',
      items: [
        { type: 'paragraph', value: 'Touring supports different types of items to draft up a card. Here\'s an example for embedding a youtube video:' },
        { type: 'embed', value: 'https://www.youtube.com/embed/ZgNu77oiKo8?autoplay=1&mute=1&controls=0' },
        { type: 'code', value: `{\n  type: 'embed',\n  value: '//youtube.com/embed/ZgNu77oiKo8'\n}` },
        { type: 'hint', value: 'Click the button below to continue.' },
        { type: 'button', value: 'Continue' }
      ]
    }, {
      id: 'intro',
      icon: 'docs/assets/feature.svg',
      title: 'TOURING DEMO',
      items: [
        { type: 'paragraph', value: 'You can use touring to highlight specific elements on a page by providing a selector:' },
        { type: 'code', value: '{ selector: \'img[alt="touring"]\' }' },
        { type: 'paragraph', value: 'Additionally, you can set a click listener to the highlighted element, so the tour continues when clicked:' },
        { type: 'code', value: '{ listen: [\'click\'] }' },
        { type: 'hint', value: 'Click on the image to continue.' }
      ],
      selector: 'img[alt="touring"]',
      listen: ['click']
    }, {
      id: 'heading',
      icon: 'docs/assets/feature.svg',
      title: 'SELECTORS',
      items: [
        { type: 'paragraph', value: 'Touring will always find the best placement on its own. Go ahead and try resizing your browser to see how that works.' },
        { type: 'hint', value: 'Resize your browser, and continue by clicking the button below.' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'h2',
      listen: ['click']
    }, {
      id: 'github',
      icon: 'docs/assets/feature.svg',
      title: 'GITHUB',
      items: [
        { type: 'paragraph', value: 'You can learn more about touring on our GitHub page.' },
        { type: 'hint', value: 'Click the Octocat or below button to continue.' },
        { type: 'button', value: 'Continue' }
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

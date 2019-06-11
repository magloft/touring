window.$docsify = {
  name: '@magloft/touring',
  repo: 'https://github.com/magloft/touring',
  logo: 'assets/touring.svg',
  themeColor: '#178BF5',
  homepage: '../README.md',
  loadSidebar: 'SIDEBAR.md',
  executeScript: true,
  // routerMode: 'history',
  basePath: '/docs/'
}

window.startTour = function() {
  const tour = touring({
    steps: [{
      id: 'intro',
      icon: 'docs/assets/feature.svg',
      title: 'TOURING DEMO',
      message: 'Welcome to the Demo Tour! This tour was created using touring, I hope you enjoy!',
      selector: 'img[alt="@magloft/touring"]',
      buttonLabel: 'Get Started'
    }, {
      id: 'heading',
      icon: 'docs/assets/feature.svg',
      title: 'SELECTORS',
      message: 'You can point to any CSS selecters to highlight elements: <pre>{ selector: "h2" }</pre>Click on the heading to continue.',
      selector: 'h2',
      listen: ['click']
    }, {
      id: 'github',
      icon: 'docs/assets/feature.svg',
      title: 'GITHUB',
      message: 'You can learn more about touring on our GitHub page.',
      selector: '.github-corner',
      listen: ['click']
    }, {
      id: 'success',
      icon: 'docs/assets/feature.svg',
      title: 'COMPLETE',
      message: 'Thanks for taking the tour!',
      buttonLabel: 'Finish Tour'
    }]
  })
  tour.start()
}

import touring from '../../src/index'
import '../shared/examples.css'

window.addEventListener('DOMContentLoaded', function() {
  const tour = touring({
    steps: [{
      id: 'code',
      icon: '/docs/assets/feature.svg',
      title: 'RIDDLE',
      items: [
        { type: 'paragraph', value: 'What is greater than God, more evil than the devil, the poor have it, the rich need it, and if you eat it, you\'ll die?' },
        { type: 'hint', value: 'Solve the riddle to continue with this tour.' },
        { type: 'button', value: 'Unlock' }
      ],
      selector: 'form[name=form]',
      condition: '$(#answer).value == "nothing" || $(#answer).value == "something"'
    }, {
      id: 'success',
      icon: '/docs/assets/feature.svg',
      title: 'Congratulations!',
      items: [
        { type: 'paragraph', value: 'You are awesome, you have solved the impossible riddle!' },
        { type: 'button', value: 'End Tour' }
      ]
    }]
  })
  tour.start()
})

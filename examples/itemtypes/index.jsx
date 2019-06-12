const { h, Component } = require('preact')
import touring from '../../src/index'
import '../shared/examples.css'
import './index.scss'

class ItemFeedback extends Component {
  constructor(props) {
    super(props)
    this.state = { rating: null, submitted: false }
  }

  submitFeedback(rating) {
    this.setState({ rating, submitted: true })
    setTimeout(() => {
      const { step } = this.props
      step.tour.continue()
    }, 1500)
  }

  render(props, { rating, submitted }) {
    if (submitted) {
      return (
        <div class='trng-card-item-feedback-submitted'>
          Thank you for rating us with a {rating} score!
        </div>
      )
    }
    return (
      <div class='trng-card-item-feedback'>
        <a class='trng-card-item-feedback-item' rating='low' onClick={() => {this.submitFeedback('low')}}></a>
        <a class='trng-card-item-feedback-item' rating='medium' onClick={() => {this.submitFeedback('medium')}}></a>
        <a class='trng-card-item-feedback-item' rating='high' onClick={() => {this.submitFeedback('high')}}></a>
      </div>
    )
  }
}

touring.registerItemType('feedback', ItemFeedback)


window.addEventListener('DOMContentLoaded', function() {
  const tour = touring({
    steps: [{
      id: 'code',
      icon: '/docs/assets/feature.svg',
      title: 'FEEDBACK',
      items: [
        { type: 'paragraph', value: 'Please let us know what you think of touring:' },
        { type: 'feedback', value: 'AWESOME' }
      ]
    }, {
      id: 'success',
      icon: '/docs/assets/feature.svg',
      title: 'Thanks!',
      items: [
        { type: 'paragraph', value: 'Thank you for submitting your feedback!' },
        { type: 'button', value: 'End Tour' }
      ]
    }]
  })
  tour.start()
})

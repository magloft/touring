import touring from '../../src/index'
import '../shared/examples.css'

angular.module('form', []).controller('FormController', function($scope, $timeout) {
  $scope.submitted = false
  $scope.loading = false
  $scope.onSubmit = function($event) {
    $event.preventDefault()
    $scope.loading = true
    $timeout(2000).then(() => {
      $scope.submitted = true
      $scope.loading = false
    })
  }

  const tour = touring({
    context: $scope,
    steps: [{
      id: 'intro',
      icon: '/docs/assets/feature.svg',
      title: 'Contact Form',
      items: [
        { type: 'paragraph', value: 'Send us a message!' },
        { type: 'button', value: 'Get Started' }
      ],
      selector: 'form[name=form]',
      listen: ['click']
    }, {
      id: 'name',
      icon: '/docs/assets/feature.svg',
      title: 'Your name',
      items: [
        { type: 'paragraph', value: 'Let us know your name!' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'input[name=name]',
      condition: 'form.name["$valid"] == true',
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'email',
      icon: '/docs/assets/feature.svg',
      title: 'Your email',
      items: [
        { type: 'paragraph', value: 'Let us know your email!' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'input[name=email]',
      condition: 'form.email["$valid"] == true',
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'phone',
      icon: '/docs/assets/feature.svg',
      title: 'Your phone number',
      items: [
        { type: 'paragraph', value: 'Let us know your phone number!' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'input[name=phone]',
      condition: 'form.phone["$valid"] == true',
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'website',
      icon: '/docs/assets/feature.svg',
      title: 'Your website',
      items: [
        { type: 'paragraph', value: 'Let us know your website!' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'input[name=website]',
      condition: 'form.website["$valid"] == true',
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'message',
      icon: '/docs/assets/feature.svg',
      title: 'Your message',
      items: [
        { type: 'paragraph', value: 'Let us know your message!' },
        { type: 'button', value: 'Continue' }
      ],
      selector: 'textarea[name=message]',
      condition: 'form.message["$valid"] == true',
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'submit',
      icon: '/docs/assets/feature.svg',
      title: 'Submit form',
      items: [
        { type: 'paragraph', value: 'Awesome, we now have all information we need to submit the form!' },
        { type: 'hint', value: 'Click the submit button' }
      ],
      selector: 'button[name=submit]',
      condition: 'submitted == true',
      autoadvance: true
    }, {
      id: 'success',
      icon: '/docs/assets/feature.svg',
      title: 'All done!',
      items: [
        { type: 'paragraph', value: 'Thanks for sending us your message!' },
        { type: 'button', value: 'Bye Bye' }
      ]
    }]
  })
  tour.start()
})

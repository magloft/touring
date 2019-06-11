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
    scope: $scope,
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
      conditions: [['form.name.$valid', 'eq', true]],
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
      conditions: [['form.email.$valid', 'eq', true]],
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
      conditions: [['form.phone.$valid', 'eq', true]],
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
      conditions: [['form.website.$valid', 'eq', true]],
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
      conditions: [['form.message.$valid', 'eq', true]],
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
      conditions: [['submitted', 'eq', true]],
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

  $scope.$watchGroup(['form.name.$valid', 'form.email.$valid', 'form.phone.$valid', 'form.website.$valid', 'form.message.$valid', 'submitted', 'loading'], () => {
    $timeout(() => { tour.validate() }, 100)
  })
  tour.start()
})

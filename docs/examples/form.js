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
      message: 'Send us a message!',
      selector: 'form[name=form]',
      button: { label: 'Get Started', color: '#37D28F' }
    }, {
      id: 'name',
      icon: '/docs/assets/feature.svg',
      title: 'Your name',
      message: 'Let us know your name!',
      selector: 'input[name=name]',
      conditions: [['form.name.$valid', 'eq', true]],
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'email',
      icon: '/docs/assets/feature.svg',
      title: 'Your email',
      message: 'Let us know your email!',
      selector: 'input[name=email]',
      conditions: [['form.email.$valid', 'eq', true]],
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'phone',
      icon: '/docs/assets/feature.svg',
      title: 'Your phone number',
      message: 'Let us know your phone number!',
      selector: 'input[name=phone]',
      conditions: [['form.phone.$valid', 'eq', true]],
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'website',
      icon: '/docs/assets/feature.svg',
      title: 'Your website',
      message: 'Let us know your website!',
      selector: 'input[name=website]',
      conditions: [['form.website.$valid', 'eq', true]],
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'message',
      icon: '/docs/assets/feature.svg',
      title: 'Your message',
      message: 'Let us know your message!',
      selector: 'textarea[name=message]',
      conditions: [['form.message.$valid', 'eq', true]],
      listen: ['blur', 'change'],
      trigger: ['focus']
    }, {
      id: 'submit',
      icon: '/docs/assets/feature.svg',
      title: 'Submit form',
      message: 'Awesome, now you can submit the form!',
      selector: 'button[name=submit]',
      conditions: [['submitted', 'eq', true]],
      button: false,
      autoadvance: true
    }, {
      id: 'success',
      icon: '/docs/assets/feature.svg',
      title: 'All done!',
      message: 'Thanks for sending us your message!',
      button: { label: 'Finish Tour', color: '#37D28F' }
    }]
  })

  $scope.$watchGroup(['form.name.$valid', 'form.email.$valid', 'form.phone.$valid', 'form.website.$valid', 'form.message.$valid', 'submitted', 'loading'], () => {
    $timeout(() => { tour.validate() }, 100)
  })
  tour.start()
})

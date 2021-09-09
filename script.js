// Data initial

let form = document.querySelector('.validator')

let validator = {
  handleSubmit: e => {
    e.preventDefault()

    let send = true

    let inputs = document.querySelectorAll('input')

    validator.clearError()

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      let check = validator.checkInput(input)
      if (check !== true) {
        send = false
        validator.showError(input, check)
      }
    }

    if (send) {
      form.submit()
    }
  },
  checkInput: input => {
    let rules = input.getAttribute('data-rules')

    if (rules !== null) {
      rules = rules.split('|')
      for (let k in rules) {
        let rDatails = rules[k].split('=')

        switch (rDatails[0]) {
          case 'required':
            if (input.value == '') {
              return 'Preenchimento do campo obrigatório.'
            }
            break

          case 'min':
            if (input.value.length < rDatails[1]) {
              return `Campo tem que ter pelo menos ${rDatails[1]} caracteres`
            }
            break

          case 'email':
            if (input.value !== '') {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

              if (!regex.test(input.value.toLowerCase())) {
                return `Email não valido.`
              }
            }
        }
      }
    }
    return true
  },

  showError: (input, error) => {
    input.style.borderColor = '#FF0000'

    let errorElement = document.createElement('div')
    errorElement.classList.add('error')
    errorElement.innerHTML = error

    form.insertBefore(errorElement, input.nextElementSibling)
  },
  clearError: () => {
    let inputs = form.querySelectorAll('input')
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = ''
    }

    let errorElements = document.querySelectorAll('.error')
    for (let e = 0; e < errorElements.length; e++) {
      errorElements[e].remove()
    }
  }
}

//Events

form.addEventListener('submit', validator.handleSubmit)

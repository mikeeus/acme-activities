export const getHeader = () =>
  cy.get('h1');

export const getFormControl = (label) =>
  cy.get(`acme-widgets-form-control[label='${label}']`)

export const fillFirstName = (firstName='Mikias') =>
  cy.get('input[formcontrolname=firstName]')
    .type(firstName)

export const getFormControlErrors = (label) =>
  getFormControl(label).find('.errors small')

export const fillLastName = (lastName='Abera') =>
  cy.get('input[formcontrolname=lastName]')
    .type(lastName)

export const fillName = () =>
  cy.get('input[formcontrolname=firstName]')
    .type('Mikias')
    .get('input[formcontrolname=lastName]')
    .type('Abera{enter}')

export const fillEmail = (email='mikias@email.com') =>
  cy.get('input[formcontrolname=email]')
    .type(email)
    
export const selectAcitivity = () =>
  cy.get('select[formcontrolname=activity]')
    .select('Initial Coin Offering')
      
export const nextStep = () =>
  cy.get('button.next').click()
      
export const fillComments = () => 
  cy.get('textarea[formcontrolname=comments]')
    .type('Test Comments{enter}')
      
export const submitForm = () =>
  cy.get('button.submit').click()

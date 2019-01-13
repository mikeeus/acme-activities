export const getHeader = () =>
  cy.get('h1');

// FORM CONTROLS
export const getFormControl = (label) =>
  cy.get(`acme-widgets-form-control[label='${label}']`)

export const getFormControlErrors = (label) =>
  getFormControl(label).find('.errors small')

// FORM INPUTS
export const fillFirstName = (firstName='Mikias') =>
  cy.get('input[formcontrolname=firstName]')
    .type(firstName)

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
      
export const fillComments = () => 
  cy.get('textarea[formcontrolname=comments]')
    .type('Test Comments{enter}')

// FORM ACTIONS
export const nextStep = () =>
  cy.get('button.next').click()      
      
export const submitForm = () =>
  cy.get('button.submit').click()

// REGISTRY
export const getRegistry = () =>
  cy.get('acme-widgets-registry')

export const getRegistrations = () =>
  getRegistry().find('ul acme-widgets-registration-item')

export const getFirstRegistration = () =>
  getRegistry().find('ul acme-widgets-registration-item:first-child')

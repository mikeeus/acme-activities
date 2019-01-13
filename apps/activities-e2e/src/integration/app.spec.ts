import { getHeader, fillFirstName, getFormControlErrors, fillLastName, fillEmail, selectAcitivity, fillComments, nextStep, submitForm } from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getHeader().contains('Sign Up For ACME Activities!');

    fillFirstName('m')
    getFormControlErrors('First Name').contains('First Name must be at least 2 characters')
    fillFirstName('{backspace}')
    getFormControlErrors('First Name').contains('First Name is required')
    fillFirstName('Mikias')

    fillLastName('a')
    getFormControlErrors('Last Name').contains('Last Name must be at least 2 characters')
    fillLastName('{backspace}')
    getFormControlErrors('Last Name').contains('Last Name is required')
    fillLastName('Abera{enter}')

    fillEmail('e')
    getFormControlErrors('Email').contains('Email must be a valid email')
    fillEmail('{backspace}')
    getFormControlErrors('Email').contains('Email is required')
    fillEmail('mikias@email.com{enter}')

    selectAcitivity()
    nextStep()
    fillComments()
    submitForm()

    getHeader().contains('Registrations')
  });
});

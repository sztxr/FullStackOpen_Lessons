describe('Note ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login')
      .click()
  })

  it('user can login', function () {
    cy.contains('login')
      .click()
    // cy.get('input:first')
    cy.get('#username')
      .type('sztxr')
    // cy.get('input:last')
    cy.get('#password')
      .type('test')
    cy.get('#btn-login')
      .click()
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('sztxr')
      cy.get('#password')
        .type('test')
      cy.get('#btn-login')
        .click()
    })

    it('name of the user is shown', function () {
      cy.contains('Eszter logged in')
    })

    it('a new note can be created', function() {
      cy.contains('Create a new note')
        .click()
      cy.get('#newNote')
        .type('a note created by cypress')
      cy.get('#btn-save')
        .click()
      cy.contains('a note created by cypress')
    })
  })
})
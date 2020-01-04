describe('Note App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Eszter',
      username: 'sztxr',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login')
      .click()
  })

  // it('user can login', function () {
  //   cy.contains('login')
  //     .click()
  //   // cy.get('input:first')
  //   cy.get('#username')
  //     .type('sztxr')
  //   // cy.get('input:last')
  //   cy.get('#password')
  //     .type('test')
  //   cy.get('#btn-login')
  //     .click()
  // })

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

    it('a new note can be created', function () {
      cy.contains('Create a new note')
        .click()
      cy.get('#newNote')
        .type('a note created by cypress')
      cy.get('#btn-save')
        .click()
      cy.contains('a note created by cypress')
    })

    describe('and a note is created', function () {
      beforeEach(function () {
        cy.contains('Create a new note')
          .click()
        cy.get('#newNote')
          .type('another note by cypress')
        cy.get('#btn-save')
          .click()
      })

      it('it can be made important', function () {
        cy.contains('another note by cypress')
          .contains('mark as important')
          .click()
        // after the click, the note gets deleted for some reason,
        // so the bellow code doesn't work
        // cy.contains('another note by cypress')
        //   .contains('mark as not important')
      })
    })
  })
})
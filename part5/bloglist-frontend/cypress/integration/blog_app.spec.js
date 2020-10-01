const user1 = {
  name: 'Matti Luukkainen',
  username: 'mluukkai',
  password: 'salainen',
}

const user2 = {
  name: 'Matti Luukkainen',
  username: 'mluukkai2',
  password: 'salainen2',
}

describe('Blog app', function() {
  beforeEach( function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.visit('http://localhost:3000')
  })

  afterEach(() => {
    cy.window().then(window => window.localStorage.clear())
  })

  it('Login form is shown', function() {
    cy.contains('blogs')
    cy.contains('login')
    cy.get('#login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login').click()
      cy.get('input[id=username]').type(user1.username)
      cy.get('input[id=password]').type(user1.password)
      cy.get('#login-button').click()
      cy.contains('logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#login').click()
      cy.get('input[id=username]').type(user2.username)
      cy.get('input[id=password]').type(user2.password)
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
    })

    it('A blog can be created', function() {
      // ...
    })
  })
})
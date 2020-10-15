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
    cy.request('POST', 'http://localhost:3001/api/users', user1)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
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
      cy.get('input[id=username]').type('testname')
      cy.get('input[id=password]').type('testpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#login').click()
      cy.get('input[id=username]').type(user1.username)
      cy.get('input[id=password]').type(user1.password)
      cy.get('#login-button').click()
      // cy.login({ username: user1.username, password: user1.password })
    })

    it('A blog can be created', function() {
      cy.get('#create-blog').click()
      cy.get('#title').type('First Blog')
      cy.get('#author').type('Mike')
      cy.get('#url').type('https://mike.net')
      cy.get('#save-button').click()
      cy.contains('a new blog First Blog by Mike added')

      cy.request('GET', 'http://localhost:3001/api/blogs').then(
        (res) => {
          const blogs = res.body
          expect(blogs).to.have.length(1)
        }
      )
      cy.visit('http://localhost:3000')
      cy.contains('First Blog by Mike')
      cy.contains('view')
    })
  })

  describe.only('When logged in with one exist blog', function() {
    beforeEach(function() {
      cy.login({ username: user1.username, password: user1.password })
      cy.createBlog({ title:'First Blog', author: 'Mike1', url:'https://mike.net' })
      cy.login({ username: user2.username, password: user2.password })
      cy.createBlog({ title:'Second Blog', author: 'Mike2', url:'https://mike.net' })

      cy.get('#login').click()
      cy.get('input[id=username]').type(user1.username)
      cy.get('input[id=password]').type(user1.password)
      cy.get('#login-button').click()

      cy.request('GET', 'http://localhost:3001/api/blogs')
      cy.visit('http://localhost:3000')
    })

    it('A blog can be liked', function () {
      cy.contains('First Blog by Mike1').contains('view').click()
      cy.contains('likes: 0').get('#like-button').click()
      cy.contains('likes: 1').get('#like-button').click()
      cy.contains('likes: 2')
    })

    it('Can delete own blog', function () {
      cy.contains('First Blog by Mike1').contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('Deleted Blog: First Blog')

      cy.request('GET', 'http://localhost:3001/api/blogs').then(
        (res) => {
          const blogs = res.body
          expect(blogs).to.have.length(1)
        }
      )
    })

    it('Can\'t delete others blog', function () {
      cy.contains('Second Blog').contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('Failed to Delete')

      cy.request('GET', 'http://localhost:3001/api/blogs').then(
        (res) => {
          const blogs = res.body
          expect(blogs).to.have.length(2)
        }
      )
    })

    it.only('blogs are ordered by like', function () {
      cy.contains('Second Blog').contains('view').click()
      cy.contains('likes: 0').get('#like-button').click()
      cy.contains('likes: 1').get('#like-button').click()
      cy.visit('http://localhost:3000')
      cy.get('#blog-form').first().contains('Second Blog')
    })
  })
})
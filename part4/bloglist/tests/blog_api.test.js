const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

jest.setTimeout(30000)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('HTTP GET', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs length', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('whether the unique identifier named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('HTTP POST', () => {
  test('blogs length plus 1', async () => {

    const newBlog = new Blog({
      title: 'Type w111',
      author: 'Robert C. Martin111',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    })

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('If post request lack the attributes with "title" and "url", return 400 Bad Request', async () => {

    const newBlog = {
      author: 'Kathy'
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('If post request lack the "likes" attribute, set it to 0', async () => {

    const newBlog = {
      title: 'Type w111',
      author: 'Kathy',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
  
    const response = await api.get('/api/blogs')
    const newPost = response.body[helper.initialBlogs.length]

    expect(newPost.likes).toBe(0)
  })

})

describe('HTTP DELETE', () => {
  test('blogs deleted one object', async () => {
    const id = helper.initialBlogs[0]._id
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
  })
})

describe('HTTP PUT', () => {
  test('blogs updated one object\'s like', async () => {
    const updatedBlog = {...helper.initialBlogs[0], likes:123}
    await api
      .put(`/api/blogs/${updatedBlog._id}`)
      .send(updatedBlog)

    const response = await api.get('/api/blogs')
    expect(response.body[0].likes).toBe(123)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

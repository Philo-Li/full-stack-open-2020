require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()
const bodyParser = require('body-parser')
const Blog = require('./models/blog')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

// const blogs = [
//   {
//     _id: '5a422a851b54a676234d17f7',
//     title: 'React patterns',
//     author: 'Michael Chan',
//     url: 'https://reactpatterns.com/',
//     likes: 7,
//     __v: 0,
//   },
//   {
//     _id: '5a422aa71b54a676234d17f8',
//     title: 'Go To Statement Considered Harmful',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//     likes: 5,
//     __v: 0,
//   },
//   {
//     _id: '5a422b3a1b54a676234d17f9',
//     title: 'Canonical string reduction',
//     author: 'Edsger W. Dijkstra',
//     url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//     likes: 12,
//     __v: 0,
//   },
//   {
//     _id: '5a422b891b54a676234d17fa',
//     title: 'First class tests',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
//     likes: 10,
//     __v: 0,
//   },
//   {
//     _id: '5a422ba71b54a676234d17fb',
//     title: 'TDD harms architecture',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//     likes: 0,
//     __v: 0,
//   },
//   {
//     _id: '5a422bc61b54a676234d17fc',
//     title: 'Type wars',
//     author: 'Robert C. Martin',
//     url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
//     likes: 2,
//     __v: 0,
//   }]

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs.map((blog) => blog.toJSON()))
    })
})

// eslint-disable-next-line consistent-return
app.post('/api/blogs', (request, response, next) => {
  // eslint-disable-next-line prefer-destructuring
  const { body: reqBody } = request

  if (!reqBody.title) {
    console.log(reqBody)
    return response.status(400).json({
      error: 'blog is missing',
    })
  }

  const blog = new Blog({
    title: reqBody.title,
    author: reqBody.author,
    url: reqBody.url,
    likes: reqBody.likes,
  })

  console.log('here!')

  blog
    .save()
    .then((savedBlog) => {
      console.log(`added ${blog.title} ${blog.author} to Bloglist`)
      response.status(201).json(savedBlog.toJSON())
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
  return true
}

app.use(errorHandler)

const { PORT: envPORT } = process.env

app.listen(envPORT, () => {
  console.log(`Server running on port ${envPORT}`)
})

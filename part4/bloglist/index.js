require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()
const bodyParser = require('body-parser')
const Blog = require('./models/blog')

app.use(bodyParser.json())
app.use(cors())
app.use(express.json())

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

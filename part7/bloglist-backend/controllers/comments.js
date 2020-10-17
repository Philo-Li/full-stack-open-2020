const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({})

  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const comment = new Comment({
    comment: body,
    blogId: request.params.id
  })

  const savedComment = await comment.save()

  response.json(savedComment)
})

module.exports = commentsRouter
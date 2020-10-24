const { ApolloServer, UserInputError, gql, AuthenticationError, PubSub } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const pubsub = new PubSub()

const MONGODB_URI = 'mongodb+srv://fullstack:fullstackopen@cluster0.bbj9d.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
    username: String!
    favoriteGenre: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author!
    me: User
  }
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
  }  
`

const resolvers = {
  Query: {
    bookCount: async() => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async() => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async(root, args) => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 })
      const filterAuthor = args.author ? books.filter((book) => String(book.author.name) === String(args.author)) : books
      const filterGenre = args.genre ? filterAuthor.filter((book) => book.genres.includes(args.genre) === true) : filterAuthor
      return filterGenre
    },
    allAuthors: () => Author.find({}),
    findAuthor: (root, args) => Author.findOne({ name: args.name }),
    me: (root, args, context) => {
      return context.currentUser
    },
  },
  Author: {
    bookCount: async(root) => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 })
      const booksByAuthor = books.filter((book) => String(book.author.name) === String(root.name))
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async(root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      let author = await Author.findOne({ name: args.author })
      if(!author){
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author: author._id, id: uuid() })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const result = await Book.findOne({ _id: book._id }).populate('author', { name: 1, born: 1 })

      pubsub.publish('BOOK_ADDED', { bookAdded: result })

      return result
    },
    editAuthor: async(root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },
    createUser: async(root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return user
    },
    login: async(root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const result = {
        value: jwt.sign(userForToken, JWT_SECRET),
        username: user.username,
        favoriteGenre: user.favoriteGenre
      }

      return result
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
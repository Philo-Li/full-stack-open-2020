const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstackopen@cluster0.bbj9d.mongodb.net/library-app?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
//     born: 1952,
//   },
//   {
//     name: 'Martin Fowler',
//     id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
//     born: 1821
//   },
//   { 
//     name: 'Joshua Kerievsky', // birthyear not known
//     id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
//   },
//   { 
//     name: 'Sandi Metz', // birthyear not known
//     id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
//   },
// ]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     id: "afa5de00-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     id: "afa5de01-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'patterns']
//   },  
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     id: "afa5de02-344d-11e9-a414-719c6709cf3e",
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de03-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },
// ]

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
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author!
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
  },
  Author: {
    bookCount: async(root) => {
      const books = await Book.find({}).populate('author', { name: 1, born: 1 })
      const booksByAuthor = books.filter((book) => String(book.author.name) === String(root.name))
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: async(root, args) => {
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

      return Book.findOne({ _id: book._id }).populate('author', { name: 1, born: 1 })
    },
    editAuthor: async(root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
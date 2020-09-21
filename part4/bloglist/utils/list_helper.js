const { result } = require('lodash');
var _ = require('lodash');

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs[0]
  const result = blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog);
  return result
}

const mostBlogs = (blogs) => {
  let most = {author: '', blogs: 0}
  const author = _.reduce(blogs, function(result, blog) {
    if(!result[blog.author]){
      result[blog.author] = 0
    }
    result[blog.author] = result[blog.author] + 1;
    if(result[blog.author] > most.blogs) {
      most = {
        author: blog.author,
        blogs: result[blog.author]
      }
    }
    return result;
  }, {});
  console.log(author, most)
  return most
}

const mostLikes = (blogs) => {
  let most = {author: '', likes: 0}
  const author = _.reduce(blogs, function(result, blog) {
    if(!result[blog.author]){
      result[blog.author] = 0
    }
    result[blog.author] = result[blog.author] + blog.likes;
    if(result[blog.author] > most.likes) {
      most = {
        author: blog.author,
        likes: result[blog.author]
      }
    }
    return result;
  }, {});
  console.log(author, most)
  return most
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
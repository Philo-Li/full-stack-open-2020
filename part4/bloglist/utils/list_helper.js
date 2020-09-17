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

module.exports = {
  totalLikes,
  favoriteBlog
}
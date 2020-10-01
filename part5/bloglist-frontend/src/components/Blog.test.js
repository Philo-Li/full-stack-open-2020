import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'https://mike.net',
    likes: 12,
    author: 'Mike',
  }

  const component = render(
    <Blog blog={blog} />
  )

  // const li = component.container.querySelector('li')

  // console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library', 'Mike'
  )

  expect(component.container).not.toHaveTextContent(
    'https://mike.net', 'likes'
  )
  // expect(element).toBeEmpty()
})

test('clicking the view button shows the blog detail', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'https://mike.net',
    likes: 12,
    author: 'Mike',
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  // const li = component.container.querySelector('li')

  // console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'https://mike.net', 12
  )
})

test('dubble clicking the button calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'https://mike.net',
    likes: 12,
    author: 'Mike',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const buttonView = component.getByText('view')
  fireEvent.click(buttonView)

  const buttonLike = component.getByText('like')
  fireEvent.click(buttonLike)
  fireEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm handleSubmit={addBlog} />
  )

  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Mike' }
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  // expect(onSubmit).to.equal(true)
})
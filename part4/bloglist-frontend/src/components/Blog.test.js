import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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

  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library', 'Mike'
  )

  expect(component.container).not.toHaveTextContent(
    'https://mike.net', 'likes'
  )
  // expect(element).toBeEmpty()
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    url: 'https://mike.net',
    likes: 12,
    author: 'Mike',
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    'https://mike.net', 12
  )
})
import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from '../components/Note'

// to run tests normally `CI=true npm test`

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(<Note note={note} />)

  // component.debug()
  const li = component.container.querySelector('li')
  console.log(prettyDOM(li))

  // method 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // method 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()

  // method 3
  const div = component.container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
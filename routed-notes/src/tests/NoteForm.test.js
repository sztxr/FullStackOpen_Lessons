import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NoteForm from '../components/NoteForm'

const Wrapper = (props) => {
  const onChange = e => {
    props.state.value = e.target.value
  }
  
  return (
    <NoteForm
      data={props.state.value}
      handleSubmit={props.onSubmit}
      handleNoteChange={onChange}
    />
  )
}

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn()
  const state = { value: '' }

  const component = render(
    <Wrapper onSubmit={onSubmit} state={state} />
  )

  // component.debug()

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  fireEvent.change(input, { target: { value: 'testing of forms could be easier' } })
  fireEvent.submit(form)

  expect(onSubmit.mock.calls.length).toBe(1)
  expect(state.value).toBe('testing of forms could be easier')  
})
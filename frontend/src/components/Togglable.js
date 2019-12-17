import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const { buttonLabel, title, classType, children } = props

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => { setVisible(!visible) }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className={`${classType}-container`}>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="btn btn-primary">{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div className={`${classType}-header`}>
          <h2>{title}</h2>
          <button onClick={toggleVisibility} className="btn btn-secondary">Cancel</button>
        </div>
        {children}
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
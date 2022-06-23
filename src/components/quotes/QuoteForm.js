import { useRef, useState } from 'react'
import { Prompt } from 'react-router-dom'

import Card from '../UI/Card'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './QuoteForm.module.css'

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false)
  const authorInputRef = useRef()
  const textInputRef = useRef()

  function submitFormHandler(event) {
    event.preventDefault()

    const enteredAuthor = authorInputRef.current.value
    const enteredText = textInputRef.current.value

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText })
  }
  const formFocusedHandler = () => {
    console.log('focus!')
    setIsEntering(true)
  }

  const finishEnteringData = () => {
    setIsEntering(false)
  }
  return (
    <>
      <Prompt when={isEntering} message={() => 'Are you sure?'} />
      <Card>
      {props.error && <p style={{color: 'red'}}>{props.error}</p>}
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input required type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea required id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringData} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default QuoteForm

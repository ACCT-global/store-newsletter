import React, { ChangeEvent, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'
import { formatIOMessage } from 'vtex.native-types'
import { useCssHandles } from 'vtex.css-handles'

import {
  useNewsletterDispatch,
  useNewsletterState,
} from './components/NewsletterContext'

interface Props {
  placeholderText?: string
  inputLabel?: string
  errorMessage?: string
}

const CSS_HANDLES = ['nameInputContainer'] as const

function FormNameInput(props: Props) {
  const {
    placeholderText = 'store/newsletter-input-name.placeholderText.default',
    errorMessage = 'store/newsletter-input-name.errorMessage.default',
    inputLabel,
  } = props

  const { invalidName } = useNewsletterState()
  const dispatch = useNewsletterDispatch()
  const handles = useCssHandles(CSS_HANDLES)
  const intl = useIntl()

  // Initialize `name` context value to signal that there is a FormNameInput
  // being rendered inside the newsletter form.
  useEffect(() => dispatch({ type: 'UPDATE_NAME', value: '' }), [dispatch])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'UPDATE_NAME', value: e.target.value.trim() })
  }

  return (
    <div className={handles.nameInputContainer}>
      <Input
        id="newsletter-input-name"
        name="newsletter"
        onChange={handleChange}
        label={formatIOMessage({ id: inputLabel, intl })}
        errorMessage={
          invalidName ? formatIOMessage({ id: errorMessage, intl }) : null
        }
        placeholder={formatIOMessage({ id: placeholderText, intl })}
      />
    </div>
  )
}

FormNameInput.schema = {
  title: 'admin/editor.newsletter-input-name.title',
}

export default FormNameInput

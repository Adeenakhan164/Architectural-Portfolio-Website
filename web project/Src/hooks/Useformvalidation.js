/**
 * useFormValidation.js
 * Custom hook — demonstrates: useState for form values, errors, and submission state
 * Reusable across any form in the app.
 */

import { useState } from 'react'

/**
 * @param {Object} initialValues  - initial field values
 * @param {Function} validate     - validation function returning an errors object
 * @returns form state + handlers
 */
export function useFormValidation(initialValues, validate) {
  const [values, setValues]       = useState(initialValues)
  const [errors, setErrors]       = useState({})
  const [touched, setTouched]     = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const fieldErrors = validate({ ...values })
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] || '' }))
  }

  // Full form submission handler
  const handleSubmit = async (e, onSubmit) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    )
    setTouched(allTouched)

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
        setSubmitSuccess(true)
        setValues(initialValues)
        setTouched({})
      } catch (err) {
        console.error('Submission error:', err)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setSubmitSuccess(false)
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  }
}
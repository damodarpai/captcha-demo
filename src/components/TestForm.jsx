import { useState, useRef, useEffect } from 'react'
import { TextField, Typography, Button } from '@mui/material'

const TestForm = ({ setCaptchaToken }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const [formErrors, setFormErrors] = useState({
    first_name: false,
    last_name: false,
    email: false
  })
  const recaptchaRef = useRef(null)
  const widgetIdRef = useRef(null)

  const renderRecaptcha = () => {
    if (!window.grecaptcha || widgetIdRef.current !== null) return
    
    widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
      sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      size: "invisible",
      callback: handleVerify
    })
  }

  const handleVerify = async (token) => {
    try {
      setCaptchaToken(token)
    } finally {
      window.grecaptcha.reset(widgetIdRef.current)
    }
  }
  
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const errors = {
      first_name: formData.first_name.trim() === '' ? true : false,
      last_name: formData.last_name.trim() === '' ? true : false,
      email: formData.email.trim() === '' || !emailRegex.test(formData.email) ? true : false
    }
    setFormErrors(errors)
    return !(errors.first_name || errors.last_name || errors.email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const isValid = validate()

    if (!isValid) return

    window.grecaptcha.execute(widgetIdRef.current)

    setFormData({
      first_name: '',
      last_name: '',
      email: ''
    })
    setFormErrors({
      first_name: false,
      last_name: false,
      email: false
    })
  }

  useEffect(() => {
    renderRecaptcha()
  }, [])

  return (
    <div className="formContainer">
      <form className="form" onSubmit={handleSubmit}>
        <Typography variant="h4">Fill in your details</Typography>
        <TextField
          id="first_name"
          label="First Name"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          error={formErrors.first_name}
          helperText={formErrors.first_name && 'This is a mandatory field'}
        />
        <TextField
          id="last_name"
          label="Last Name"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          error={formErrors.last_name}
          helperText={formErrors.last_name && 'This is a mandatory field'}
        />
        <TextField
          id="email"
          label="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={formErrors.email}
          helperText={formErrors.email && 'This field should be a valid email'}
        />
        <div ref={recaptchaRef} />
        <Button
          variant="contained"
          type="submit"
          size="large"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default TestForm

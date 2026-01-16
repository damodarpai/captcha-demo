import { useState } from 'react'
import TestForm from './components/TestForm'
import CaptchaTokenDisplay from './components/CaptchaTokenDisplay'

const App = () => {
  const [captchaToken, setCaptchaToken] = useState(null)

  return (
    <div className="container">
      <div className="row">
        <TestForm setCaptchaToken={setCaptchaToken} />
        <CaptchaTokenDisplay captchaToken={captchaToken} />
      </div>
    </div>
  )
}

export default App

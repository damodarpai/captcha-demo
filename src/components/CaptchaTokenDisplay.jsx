import { Typography, TextField } from '@mui/material'

const CaptchaTokenDisplay = ({ captchaToken }) => {

  return (
    <div className="displayContainer">
      <div className="form">
        <Typography variant="h4">Google Recaptcha Token</Typography>
        <TextField
          id="token"
          multiline
          rows={12}
          value={captchaToken}
        />
      </div>
    </div>
  )
}

export default CaptchaTokenDisplay

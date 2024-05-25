import { mailService } from '../services/mail.service.js'

const { useState } = React

export function ComposeEmail() {
  const [newMail, setNewMail] = useState(mailService.getEmptyMail())

  function handleChange({ name, value }) {
    setNewMail(prevMail => ({ ...prevMail, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Email Sent:', { to, subject, body })
  }

  console.log(newMail)
  const { to, subject, body } = newMail

  return (
    <div className="compose-container">
      <h2>Compose Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="to">To:</label>
          <input type="email" id="to" value={to} onChange={e => handleChange(e.target)} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" value={subject} onChange={e => handleChange(e.target)} required />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea id="body" value={body} onChange={e => handleChange(e.target)} required></textarea>
        </div>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  )
}

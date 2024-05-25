import { mailService } from '../services/mail.service.js'

const { useState } = React

export function ComposeEmail({ setToggleComposeMail }) {
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
    <div className="compose-container flex flex-column">
      <div className="compose-header-container flex flex-row justify-space-between">
        <h2>New Message</h2>
        <i class="fa-solid fa-xmark" onClick={() => setToggleComposeMail(false)}></i>
      </div>

      <form className="compose-body flex flex-column">
        <input type="text" placeholder="To" />
        <input type="text" placeholder="Subject" />
        <textarea></textarea>
        <div className="compose-footer">
          <button className="send-btn">Send</button>
        </div>
      </form>
    </div>
  )
}

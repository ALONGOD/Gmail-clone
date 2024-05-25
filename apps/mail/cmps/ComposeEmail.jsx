import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useNavigate } = ReactRouter
const { useState } = React

export function ComposeEmail({ setToggleComposeMail }) {
  const [newMail, setNewMail] = useState(mailService.getEmptyMail())
  const navigate = useNavigate()

  function handleChange({ name, value }) {
    setNewMail(prevMail => ({ ...prevMail, [name]: value }))
  }

  function handleMailSubmit(ev) {
    ev.preventDefault()
    console.log(newMail)
    const newSentAt = { sentAt: new Date().getTime() }
    setNewMail(prevMail => ({ ...prevMail, ...newSentAt }))
    mailService
      .save({ ...newMail, ...newSentAt })
      .then(() => {
        showSuccessMsg('Mail sent successfully')
        console.log('mail submit')
        navigate('/mail')
        setToggleComposeMail(false)
      })
      .catch(showErrorMsg('Mail sent failed. Try again another time'))
  }

  console.log(newMail)
  const { to, subject, body } = newMail

  return (
    <div className="compose-container flex flex-column">
      <div className="compose-header-container flex flex-row justify-space-between">
        <h2>New Message</h2>
        <i className="fa-solid fa-xmark" onClick={() => setToggleComposeMail(false)}></i>
      </div>

      <form onSubmit={ev => handleMailSubmit(ev)} className="compose-body flex flex-column">
        <input type="text" name="to" onChange={ev => handleChange(ev.target)} value={to} placeholder="To" />
        <input type="text" name="subject" onChange={ev => handleChange(ev.target)} value={subject} placeholder="Subject" />
        <textarea name="body" onChange={ev => handleChange(ev.target)} value={body}></textarea>
        <div className="compose-footer">
          <button className="send-btn">Send</button>
        </div>
      </form>
    </div>
  )
}

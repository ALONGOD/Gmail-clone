import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { mailService } from '../services/mail.service.js'

const { useSearchParams } = ReactRouterDOM
const { useNavigate} = ReactRouter
const { useState, useEffect } = React

export function ComposeEmail({ }) {
  const [newMail, setNewMail] = useState(mailService.getEmptyMail())
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const draftId = searchParams.get('compose')

  useEffect(() => {
    if (draftId !== 'new') {
      if (draftId === 'note') {
        var body = searchParams.get('body')
        const subject = searchParams.get('subject')

        setNewMail((prevMail) => ({
          ...prevMail,
          body,
          subject,
        }))
        return
      }

      loadMail()
    }
  }, [])

  function loadMail() {
    mailService
      .get(draftId)
      .then(setMailToEdit)
      .catch((err) => console.log('err:', err))
  }

  function handleChange({ name, value }) {
    setNewMail(prevMail => ({ ...prevMail, [name]: value }))
  }

  function addMailAsNote() {
    navigate({
      pathname: '/note',
      search: `?subject=${newMail.subject}&body=${newMail.body}`,
    })
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
      })
      .catch(showErrorMsg('Mail sent failed. Try again another time'))
  }

  function closeMail() {
    navigate('/mail')
  }

  const { to, subject, body } = newMail

  return (
    <div className="compose-container flex flex-column">
      <div className="compose-header-container flex flex-row justify-space-between">
        <h2>New Message</h2>
        <i className="close-mail-btn fa-solid fa-xmark" onClick={closeMail}></i>
      </div>

      <form onSubmit={ev => handleMailSubmit(ev)} className="compose-body flex flex-column">
        <input type="email" name="to" onChange={ev => handleChange(ev.target)} value={to} placeholder="To" />
        <input type="text" name="subject" onChange={ev => handleChange(ev.target)} value={subject} placeholder="Subject" required/>
        <textarea name="body" onChange={ev => handleChange(ev.target)} value={body}></textarea>
        <div className="compose-footer flex flex-row justify-space-between align-center">
          <button className="send-btn" disabled={!to}>Send</button>
          <img src="assets/img/keep-img/google-keep-icon.svg" alt="google keep" onClick={addMailAsNote}/>
        </div>
      </form>
    </div>
  )
}

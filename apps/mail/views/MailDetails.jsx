import { MailDetailsHeader } from '../cmps/MailDetailsHeader.jsx'
import { MailDetailsMain } from '../cmps/MailDetailsMain.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { mailService } from '../services/mail.service.js'

const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

export function MailDetails({ setMailMainContent }) {
  const [mail, setMail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { mailId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    loadMail()
  }, [mailId])

  function loadMail() {
    setIsLoading(true)
    mailService
      .get(mailId)
      .then(mail => {
        setMail(mail)
      })
      .catch(() => {
        showErrorMsg('Couldnt get mail...')
        navigate('/mail')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function onRemoveMail() {
    mailService
      .remove(mailId)
      .then(() => {
        showSuccessMsg(`Mail successfully removed! ${mailId}`)
        navigate('/mail')
        setMailMainContent('mailList')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Error - mail not removed')
      })
  }

  function onToggleIsRead(isRead) {
    setMail(prevMail => ({ ...prevMail, isRead: isRead }))
    mailService
      .save({ ...mail, isRead: isRead })
      .then(() => {
        showSuccessMsg(`Mail marked as unread! ${mailId}`)
        navigate('/mail')
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg("Error - wasn't marked as unread")
      })
  }

  function addMailAsNote() {
    navigate({
      pathname: '/note',
      search: `?subject=${mail.subject}&body=${mail.body}`,
    })
  }

  function backToMailList() {
    setMailMainContent('mailList')
    navigate('/mail')
  }

  if (!mail) return <div>Loading...</div>
  return (
    <main className="mail-details-container">
      <MailDetailsHeader addMailAsNote={addMailAsNote} backToMailList={backToMailList} onRemove={onRemoveMail} onToggleIsRead={() => onToggleIsRead(false)} />
      <MailDetailsMain mail={mail} />
    </main>
  )
}

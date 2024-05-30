import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetailsMain({ mail }) {
  function getUser(user, type = 'to') {
    const loggedInUser = mailService.getLoggedInUser()
    const { email, fullName } = loggedInUser
    return email === user ? type + ' me' : type + ': ' + user
  }

  console.log(mail)
  const { subject, body, sentAt, from } = mail
  return (
    <main className="mail-details-main">
      <h1 className="subject">{subject}</h1>
      <div className="dates flex flex-row">
        <img src="assets/img/Unknown_person.jpg" alt="" />
        <div className="flex flex-column">
          <div className="flex flex-row">
            <h3 className="mail-from">
              From: <span>{from}</span>
            </h3>
            <h4 className="sent-at">{utilService.formatDate(sentAt)}</h4>
          </div>
          <h3 className="mail-to">{getUser('fsaf', 'to')}</h3>
        </div>
      </div>
      <p className="body">{body}</p>
    </main>
  )
}

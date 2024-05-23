import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetailsMain({ mail }) {
  function getUser(user, type = 'to') {
    const loggedInUser = mailService.getLoggedInUser()
    const { email, fullName } = loggedInUser
    console.log(loggedInUser)
    return loggedInUser.email === user ? type + ' me' : type + ': ' + user
  }

  console.log(mail)
  const { subject, body, isRead, sentAt, from, to, isStar, id } = mail
  return (
    <main className="mail-details-main">
      <h1 className="subject">{subject}</h1>
      <div className="dates flex flex-row">
        <h3 className="mail-from">
          From: <span>{from}</span>
        </h3>
        <h4 className="sent-at">{utilService.formatDate(sentAt)}</h4>
      </div>
      <h3 className="mail-to">{getUser('fsaf', 'to')}</h3>
      <p className="body">{body}</p>
    </main>
  )
}

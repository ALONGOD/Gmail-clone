import { MailListActions } from './MailListActions.jsx'
import { MailPreview } from './MailPreview.jsx'
const { useState } = React

export function MailList({ onSetFilterBy, filterBy, setMailMainContent, readAllEmails, emails, mailToRemoveFolder, onToggleIsStar, onToggleIsRead }) {
  const [hoverMailId, setHoverMailId] = useState()

  return (
    <main className="content-container grid full">
      <MailListActions readAllEmails={readAllEmails} onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
      <ul className="mail-list full">
        {emails.map(email => {
          const isReadClass = email.isRead ? 'read' : ''
          return (
            <li key={email.id} className={`${isReadClass} mail flex flex-row align-center`} onMouseEnter={() => setHoverMailId(email.id)} onMouseLeave={() => setHoverMailId(null)}>
              <MailPreview key={email.id} setMailMainContent={setMailMainContent} email={email} hoverMailId={hoverMailId} mailToRemoveFolder={mailToRemoveFolder} onToggleIsStar={onToggleIsStar} onToggleIsRead={onToggleIsRead} />
            </li>
          )
        })}
      </ul>
    </main>
  )
}

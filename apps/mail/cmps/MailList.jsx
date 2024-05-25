import { MailListActions } from './MailListActions.jsx'
import { MailPreview } from './MailPreview.jsx'
const { useState } = React

export function MailList({ emails, onRemove, onToggleIsStar, onToggleIsRead }) {
  const [hoverMailId, setHoverMailId] = useState()

  return (
    <main className="content-container grid full">
      <MailListActions />
      {/* <section className="mail-list full"> */}
      <ul className="mail-list full">
        {emails.map(email => {
          const isReadClass = email.isRead ? 'read' : ''
          return (
            <li key={email.id} className={`${isReadClass} mail flex flex-row align-center`} onMouseEnter={() => setHoverMailId(email.id)} onMouseLeave={() => setHoverMailId(null)}>
              <MailPreview key={email.id} email={email} hoverMailId={hoverMailId} onRemove={onRemove} onToggleIsStar={onToggleIsStar} onToggleIsRead={onToggleIsRead} />
            </li>
          )
        })}
      </ul>
      {/* </section> */}
    </main>
  )
}

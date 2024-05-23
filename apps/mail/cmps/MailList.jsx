import { MailPreview } from './MailPreview.jsx'

export function MailList({ emails, onRemove, onToggleIsStar, onToggleIsRead }) {
  return (
    <section className="mail-list full">
      <ul>
        {emails.map(email => (
          <MailPreview key={email.id} email={email} onRemove={onRemove} onToggleIsStar={onToggleIsStar} onToggleIsRead={onToggleIsRead} />
        ))}
      </ul>
    </section>
  )
}

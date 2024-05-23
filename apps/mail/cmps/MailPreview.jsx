import { utilService } from '../../../services/util.service.js'
import { MailToolsHover } from './MailToolsHover.jsx'
const { useParams, useNavigate } = ReactRouter
const { useState, useEffect, useRef } = React

export function MailPreview({ email, onRemove, onToggleIsStar, onToggleIsRead, hoverMailId }) {
  const { subject, body, isRead, sentAt, from, to, isStar, id } = email
  const navigate = useNavigate()

  function mailDetailsNavigation(id, isRead) {
    console.log('hi')
    onToggleIsRead(id, isRead)
    navigate(`/mail/details/${id}`)
  }

  function addThreeDots(txt, limit) {
    if (txt.length > limit) {
      return '...'
    } else {
      return ''
    }
  }

  return (
    <React.Fragment>
      <div className="mail-options-1 flex flex-row align-center justify-center">
        <input type="checkbox" />
      </div>

      <div className="mail-preview" onClick={() => mailDetailsNavigation(id, true)}>
        <h3 className="email-sender">{from}</h3>
        <p className="mail-subject">
          {subject.slice(0, 20)}
          {addThreeDots(subject, 20)}
        </p>
        <p className="mail-body">
          {body.slice(0, 50)}
          {addThreeDots(body, 50)}
        </p>
      </div>
      <div className="mail-tools flex flex-row align-center">
        {hoverMailId !== id && <h4 className="sent-at">{utilService.getTimeOfSent(sentAt)}</h4>}
        {hoverMailId === id && <MailToolsHover id={id} isRead={isRead} isStar={isStar} onRemove={onRemove} onToggleIsRead={onToggleIsRead} onToggleIsStar={onToggleIsStar} />}
      </div>
    </React.Fragment>
  )
}

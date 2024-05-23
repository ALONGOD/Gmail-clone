import { utilService } from '../../../services/util.service.js'
const { useParams, useNavigate } = ReactRouter

export function MailPreview({ email, onRemove, onToggleIsStar }) {

  const {subject, body, isRead, sentAt, from, to, isStar, id} = email
  const navigate = useNavigate()

  function mailDetailsNavigation() {
    navigate(`/mail/details/${id}`)
  }
  
  const isStarredClass = isStar
    ? `star starred fa-solid fa-star `
    : `star fa-regular fa-star`
  const isReadClass = isRead ? 'read' : ''

  function addThreeDots(txt, limit) {
    if (txt.length > limit) {
      return '...'
    } else {
      return ''
    }
  }


  return (
    <li className={`${isReadClass} mail flex flex-row align-center`} onClick={mailDetailsNavigation}>
      <div className="mail-options-1 flex flex-row align-center justify-center">
        <input type="checkbox" />
        <i className={isStarredClass} onClick={() => onToggleIsStar(id, !isStar)}></i>
      </div>

      <div className="mail-details">
        <h3 className="email-sender">{from}</h3>
        <p className="mail-subject">{subject.slice(0, 20)}{addThreeDots(subject, 20)}</p>
        <p className="mail-body">{body.slice(0, 50)}{addThreeDots(body, 50)}</p>
        <h4>{utilService.getTimeOfSent(sentAt)}</h4>
      </div>
        <i className="delete-btn fa-solid fa-trash" onClick={() => onRemove(id)}></i>
    </li>
  )
}

export function MailToolsHover({ id, isRead, isStar, onRemove, onToggleIsRead, onToggleIsStar }) {
  const isStarClass = isStar ? `star starred fa-solid fa-star ` : `star fa-regular fa-star`
  const isStarTitle = isStar ? `Starred` : `Not starred`
  const isReadClass = isRead ? `fa-envelope` :  `fa-envelope-open`
  const isReadTitle = isRead ? 'unread' : 'read'

  return (
    <React.Fragment>
      <i className="delete-btn fa-regular fa-trash-can" title="Remove mail" onClick={() => onRemove(id)}></i>
      <i className={isStarClass} title={isStarTitle} onClick={() => onToggleIsStar(id, !isStar)}></i>
      <i className={`fa-regular ${isReadClass}`} title={`Mark as ${isReadTitle}`} onClick={() => onToggleIsRead(id, !isRead)}></i>
    </React.Fragment>
  )
}

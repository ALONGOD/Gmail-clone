export function MailToolsHover({ id, isRead, isStar, onRemove, onToggleIsRead, onToggleIsStar }) {
  const isStarClass = isStar ? `star starred fa-solid fa-star ` : `star fa-regular fa-star`

  return (
    <React.Fragment>
      <i className="delete-btn fa-regular fa-trash-can" onClick={() => onRemove(id)}></i>
      <i className={isStarClass} onClick={() => onToggleIsStar(id, !isStar)}></i>
      <i className="fa-regular fa-envelope" onClick={() => onToggleIsRead(id, !isRead)}></i>
    </React.Fragment>
  )
}

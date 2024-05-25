export function MailToolsHover({ id, isRead, isStar, onRemove, onToggleIsRead, onToggleIsStar }) {
  const isStarClass = isStar ? `star starred fa-solid fa-star ` : `star fa-regular fa-star`

  return (
    <React.Fragment>
      <i className="delete-btn fa-regular fa-trash-can" title="Remove mail" onClick={() => onRemove(id)}></i>
      <i className={isStarClass} title="Star mail" onClick={() => onToggleIsStar(id, !isStar)}></i>
      <i className="fa-regular fa-envelope" title="Un/read mail" onClick={() => onToggleIsRead(id, !isRead)}></i>
    </React.Fragment>
  )
}

const { useParams, useNavigate } = ReactRouter

export function MailDetailsHeader({ backToMailList, onRemove, onToggleIsRead }) {
  const navigate = useNavigate()
  return (
    <section className="mail-details-header flex flex-row">
      <i className="fa-solid fa-arrow-left" onClick={backToMailList}></i>
      <i className="fa-regular fa-trash-can" onClick={onRemove}></i>
      <i className="fa-regular fa-envelope" onClick={() => onToggleIsRead(false)}></i>
    </section>
  )
}

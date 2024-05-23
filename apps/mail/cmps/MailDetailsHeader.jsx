const { useParams, useNavigate } = ReactRouter

export function MailDetailsHeader({ removeMail, onToggleIsRead }) {
  const navigate = useNavigate()
  return (
    <section className="mail-details-header flex flex-row">
      <i className="fa-solid fa-arrow-left" onClick={() => navigate('/mail')}></i>
      <i className="fa-regular fa-trash-can" onClick={removeMail}></i>
      <i className="fa-regular fa-envelope" onClick={() => onToggleIsRead(false)}></i>
    </section>
  )
}

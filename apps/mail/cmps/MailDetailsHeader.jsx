export function MailDetailsHeader({removeMail, onToggleIsRead}) {



  return (
    <section className="mail-actions flex flex-row">
      <i className="fa-solid fa-arrow-left"></i>
      <i className="fa-regular fa-trash-can"></i>
      <i className="fa-regular fa-envelope" onClick={() => onToggleIsRead(false)}></i>
    </section>
  )
}



export function MailDetailsHeader({ addMailAsNote, backToMailList, onRemove, onToggleIsRead }) {

  return (
    <section className="mail-details-header flex flex-row">
      <i className="fa-solid fa-arrow-left" title="Go back" onClick={backToMailList}></i>
      <i className="fa-regular fa-trash-can" title="Delete mail" onClick={onRemove}></i>
      <i className="fa-regular fa-envelope" title="Mark as unread" onClick={() => onToggleIsRead(false)}></i>
      <i className="fa-regular fa-note-sticky" title="Transfer mail into note" onClick={addMailAsNote}></i>
    </section>
  )
}

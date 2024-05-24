export function MailListActions({}) {
  return (
    <div className="mail-list-actions flex flex-row align-center">
      <div className="mail-list-checkbox-container">
        <input type="checkbox" />
        <i className="arrow-down fa-solid fa-caret-down fa-xs"></i>
      </div>
      <i className="mark-all-read fa-regular fa-envelope"></i>
    </div>
  )
}

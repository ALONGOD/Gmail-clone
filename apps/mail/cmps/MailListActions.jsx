export function MailListActions({ readAllEmails }) {
  return (
    <div className="mail-list-actions flex flex-row align-center">
      <div className="mail-list-checkbox-container">
        <input type="checkbox" title="Select all" />
        <i className="arrow-down fa-solid fa-caret-down fa-xs"></i>
      </div>
      <i className="mark-all-read fa-regular fa-envelope" title="Mark all read" onClick={readAllEmails}></i>
    </div>
  )
}

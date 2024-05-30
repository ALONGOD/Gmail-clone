const { useState } = React

export function MailListActions({ readAllEmails }) {
  const [toggleList, setToggleList] = useState(false);

  const arrowClass = toggleList ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'
  

  return (
    <div className="mail-list-actions flex flex-row align-center">
      <div className="mail-list-checkbox-container">
        <input type="checkbox" title="Select all" />
        <i onClick={() => setToggleList(state => !state)} className={`arrow-down ${arrowClass} fa-xs`}></i>
      </div>
      {toggleList && <div className="sort-options-container flex flex-column">
          <h4>All</h4>
          <h4>Read</h4>
          <h4>Unread</h4>
          <h4>Unstarred</h4>
        </div>}
      <i className="mark-all-read fa-regular fa-envelope" title="Mark all read" onClick={readAllEmails}></i>
    </div>
  )
}

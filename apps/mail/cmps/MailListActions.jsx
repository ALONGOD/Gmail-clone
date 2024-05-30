const { useState, useEffect } = React

export function MailListActions({ readAllEmails, onSetFilterBy, filterBy }) {
  const [toggleList, setToggleList] = useState(false);
  const [filterByToEdit, setFilterByToEdit] = useState({...filterBy});
  
  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])
  

  const arrowClass = toggleList ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'

  function handleChange(value) {
    setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, isRead: value }))
  }
  

  return (
    <div className="mail-list-actions flex flex-row align-center">
      <div className="mail-list-checkbox-container">
        <input type="checkbox" title="Select all" />
        <i onClick={() => setToggleList(state => !state)} className={`arrow-down ${arrowClass} fa-xs`}></i>
      </div>
      {toggleList && <div className="sort-options-container flex flex-column">
          <h4 onClick={() => handleChange('')}>All</h4>
          <h4 onClick={() => handleChange('read')}>Read</h4>
          <h4 onClick={() => handleChange('unread')}>Unread</h4>
        </div>}
      <i className="mark-all-read fa-regular fa-envelope" title="Mark all read" onClick={readAllEmails}></i>
    </div>
  )
}

const { useState, useEffect } = React

export function SidebarMenu({filterBy, onSetFilterBy, unreadMails}) {
    const [folderToEdit, setFolderToEdit] = useState({folder: filterBy.folder});
    const labels = ['inbox', 'starred', 'sent', 'drafts']
    const { folder } = filterBy

    useEffect(() => {
        onSetFilterBy({...filterBy, ...folderToEdit})
    }, [folderToEdit])

    function handleChange(value) {
        setFolderToEdit({folder: value })
    }

  return (
    <section className="sidebar-menu">
      {labels.map(label => {
        return <div key={label} onClick={() => handleChange(label)} className={`sidebar-label ${folder === label ? 'active' : ''}`}>
          {label}{label === 'inbox' ? <span>{unreadMails}</span> : ''}
          </div>
        }
      )}
    </section>
  )
}

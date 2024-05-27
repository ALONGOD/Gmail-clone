const { useState, useEffect } = React

import { NoteSidebarLabel } from './NoteSidebarLabel.jsx'

export function NotesSidebar({folder, setSidebarHover, filterBy, onSetFilterBy  }) {
  const [folderToEdit, setFolderToEdit] = useState({ folder: folder })
  const labels = ['notes', 'trash']

  useEffect(() => {
    onSetFilterBy({ ...filterBy, ...folderToEdit })
  }, [folderToEdit])
  

  function handleChange(value) {
    setFolderToEdit({ folder: value })
  }

  return (
    <div className="note-sidebar">
      <ul className="note-sidebar-menu">
        {labels.map(label => {
          return <NoteSidebarLabel
            key={label}
            label={label}
            folder={folder}
            handleChange={handleChange}
          />
        })}
      </ul>
    </div>
  )
}

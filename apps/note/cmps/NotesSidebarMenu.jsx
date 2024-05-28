const { useState, useEffect } = React

import { NoteSidebarLabel } from './NoteSidebarLabel.jsx'

export function NotesSidebar({ isSidebarOpen, folder, setSidebarHover, filterBy, onSetFilterBy }) {
  const [folderToEdit, setFolderToEdit] = useState({ folder: 'notes' })
  const labels = ['notes', 'trash']

  useEffect(() => {
    onSetFilterBy({ ...filterBy, ...folderToEdit })
  }, [folderToEdit])


  function handleChange(value) {
    setFolderToEdit({ folder: value })
  }

  return (
    <div className="note-sidebar">
      <ul className="note-sidebar-menu" onMouseEnter={() => setSidebarHover(true)} onMouseLeave={() => setSidebarHover(false)}>
        {labels.map(label => {
          return <NoteSidebarLabel
            folderToEdit={folderToEdit}
            key={label}
            label={label}
            folder={folder}
            handleChange={handleChange}
            isSidebarOpen={isSidebarOpen}
          />
        })}
      </ul>
    </div>
  )
}

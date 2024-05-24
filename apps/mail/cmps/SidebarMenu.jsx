import { ComposeButton } from './ComposeButton.jsx'
import { SidebarLabel } from './SidebarLabel.jsx'
const { useState, useEffect } = React

export function SidebarMenu({ filterBy, onSetFilterBy, unreadMails }) {
  const [folderToEdit, setFolderToEdit] = useState({ folder: filterBy.folder })
  const labels = ['inbox', 'starred', 'sent', 'drafts']
  const { folder } = filterBy
  const [sidebarHover, setSidebarHover] = useState(false)

  useEffect(() => {
    onSetFilterBy({ ...filterBy, ...folderToEdit })
  }, [folderToEdit])

  function handleChange(value) {
    setFolderToEdit({ folder: value })
  }

  return (
    <section className="sidebar-menu" onMouseEnter={() => setSidebarHover(true)} onMouseLeave={() => setSidebarHover(false)}>
      <ComposeButton />
      {labels.map(label => {
        return <SidebarLabel key={label} label={label} folder={folder} handleChange={handleChange} sidebarHover={sidebarHover} unreadMails={unreadMails} />
      })}
    </section>
  )
}

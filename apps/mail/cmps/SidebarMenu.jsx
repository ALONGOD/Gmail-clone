import { ComposeButton } from './ComposeButton.jsx'
import { SidebarLabel } from './SidebarLabel.jsx'
const { useState, useEffect } = React

export function SidebarMenu({ hoveredSidebar, setSidebarHover, filterBy, onSetFilterBy, unreadMails }) {
  const [folderToEdit, setFolderToEdit] = useState({ folder: filterBy.folder })
  const labels = ['inbox', 'starred', 'sent', 'drafts']
  const { folder } = filterBy

  useEffect(() => {
    onSetFilterBy({ ...filterBy, ...folderToEdit })
  }, [folderToEdit])

  function handleChange(value) {
    setFolderToEdit({ folder: value })
  }

  return (
    <aside>
      <section className={`sidebar-menu ${hoveredSidebar ? 'hovered' : ''}`} onMouseEnter={() => setSidebarHover(true)} onMouseLeave={() => setSidebarHover(false)}>
        <ComposeButton hoveredSidebar={hoveredSidebar} />
        {labels.map(label => {
          return <SidebarLabel key={label} label={label} folder={folder} handleChange={handleChange} hoveredSidebar={hoveredSidebar} unreadMails={unreadMails} />
        })}
      </section>
    </aside>
  )
}

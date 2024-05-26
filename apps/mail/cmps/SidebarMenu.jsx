import { ComposeButton } from './ComposeButton.jsx'
import { SidebarLabel } from './SidebarLabel.jsx'
const { useState, useEffect } = React
const { useNavigate } = ReactRouter

export function SidebarMenu({ mailMainContent, setMailMainContent, setToggleComposeMail, hoveredSidebar, setSidebarHover, filterBy, onSetFilterBy, unreadMailsCount }) {
  const [folderToEdit, setFolderToEdit] = useState({ folder: filterBy.folder })
  const labels = ['inbox', 'starred', 'sent', 'drafts']
  const { folder } = filterBy
  const navigate = useNavigate()

  useEffect(() => {
    onSetFilterBy({ ...filterBy, ...folderToEdit })
  }, [folderToEdit])

  function handleChange(value) {
    if (mailMainContent === 'details') {
      navigate('/mail')
      setMailMainContent('mailList')
    }
    setFolderToEdit({ folder: value })
  }

  function openNewCompose() {
    navigate({
      search: `?compose=new`,
    })
    setSidebarHover(false)
    setToggleComposeMail(true)
  }

  return (
    <aside>
      <section className={`sidebar-menu ${hoveredSidebar ? 'hovered' : ''}`} onMouseEnter={() => setSidebarHover(true)} onMouseLeave={() => setSidebarHover(false)}>
        <ComposeButton hoveredSidebar={hoveredSidebar} openNewCompose={openNewCompose} />
        {labels.map(label => {
          return <SidebarLabel key={label} label={label} folder={folder} handleChange={handleChange} hoveredSidebar={hoveredSidebar} unreadMailsCount={unreadMailsCount} />
        })}
      </section>
    </aside>
  )
}

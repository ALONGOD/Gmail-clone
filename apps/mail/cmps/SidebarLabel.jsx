export function SidebarLabel({ hoveredSidebar, label, folder, handleChange, unreadMailsCount }) {
  function folderLogo(label) {
    var logo
    switch (label) {
      case 'inbox':
        logo = 'fa-solid fa-inbox'
        break
      case 'starred':
        logo = 'fa-regular fa-star'
        break
      case 'sent':
        logo = 'fa-regular fa-paper-plane'
        break
      case 'drafts':
        logo = 'fa-regular fa-file'
        break
    }
    return logo
  }

  return (
    <div
      key={label}
      onClick={() => handleChange(label)}
      className={`sidebar-label ${folder === label ? 'active' : ''}
          `}
    >
      <i className={folderLogo(label)}></i>
      {hoveredSidebar && (
        <React.Fragment>
          <p>{label}</p>
          {label === 'inbox' && <span>{unreadMailsCount}</span>}
        </React.Fragment>
      )}
    </div>
  )
}

const { useNavigate } = ReactRouter

export function NoteSidebarLabel({ label, folder, handleChange }) {
    const navigate = useNavigate()

    const logo = folderLogo(label)

  function folderLogo(label) {
    switch (label) {
      case 'notes':
        return 'far fa-lightbulb'

      case 'notes':
        return 'fas fa-trash'
    }
  }

  return (
    <li className={location.pathname === '/note' ? 'active' : ''} onClick={() =>handleChange(label)}>
      <i className={logo}></i>
      <h4>{label}</h4>
    </li>
  )
}

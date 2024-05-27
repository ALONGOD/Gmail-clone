const { useNavigate } = ReactRouter

export function NoteSidebarLabel({ label, folder, handleChange }) {
    const navigate = useNavigate()

    const logo = folderLogo(label)

  function folderLogo(label) {
    switch (label) {
      case 'notes':
        return 'fa-regular fa-lightbulb'

      case 'trash':
        return 'fa-regular fa-trash-can'
    }
  }

  return (
    <li className={location.pathname === '/note' ? 'active' : ''} onClick={() =>handleChange(label)}>
      <i className={logo}></i>
      <h4>{label}</h4>
    </li>
  )
}

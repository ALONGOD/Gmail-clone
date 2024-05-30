const { Link, NavLink, useNavigate } = ReactRouterDOM
const { useState } = React

export function AppNavigation() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [appHeader, setAppHeader] = useState(null)
  const navigate = useNavigate()

  function navigateLink(params) {
    setToggleMenu(false)
    navigate(params)
  }

  return (
    <header className="app-header">
      <div className="nav-container">
        <div>
          <svg width="50" height="50" viewBox="0 0 100 100" className="menu-toggle-btn" onClick={() => setToggleMenu(state => !state)}>
            <g>
              <circle cx="20" cy="20" r="6" fill="black" />
              <circle cx="40" cy="20" r="6" fill="black" />
              <circle cx="60" cy="20" r="6" fill="black" />
              <circle cx="20" cy="40" r="6" fill="black" />
              <circle cx="40" cy="40" r="6" fill="black" />
              <circle cx="60" cy="40" r="6" fill="black" />
              <circle cx="20" cy="60" r="6" fill="black" />
              <circle cx="40" cy="60" r="6" fill="black" />
              <circle cx="60" cy="60" r="6" fill="black" />
            </g>
          </svg>
        </div>

        {toggleMenu && (
          <nav>
            <div className="icon-container flex flex-column justify-center align-center" onClick={() => navigateLink('/')}>
              <i className="head-icon fa-solid fa-house"></i>
              <NavLink to="/">Home</NavLink>
            </div>
            <div className="icon-container flex flex-column justify-center align-center" onClick={() => navigateLink('/mail')}>
              <i className="head-icon fa-regular fa-envelope "></i>
              <NavLink to="/mail">Mail</NavLink>
            </div>
            <div className="icon-container flex flex-column justify-center align-center" onClick={() => navigateLink('/note')}>
              <i className="head-icon fa-regular fa-note-sticky "></i>
              <NavLink to="/note">Note</NavLink>
            </div>
            <div className="icon-container flex flex-column justify-center align-center" onClick={() => navigateLink('/about')}>
              <i className="head-icon fa-solid fa-info"></i>
              <NavLink to="/about">About</NavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

// function DynamicHeader(header) {
//   setToggleMenu(false)

//   setAppHeader(header)

//   switch (appHeader) {
//     case 'mail':
//      return <MailAppHeader />
//     case: 'note':
//      return <NoteAppHeader />
//   }
// }

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [toggleMenu, setToggleMenu] = useState(false);
    
    
    console.log(toggleMenu)

    return <header className="app-header">
        {/* <Link to="/">
            <h1>APPSUS</h1>
        </Link> */}
        <div className="nav-container">
            <div >
                <svg width="50" height="50" viewBox="0 0 100 100" className="menu-toggle-btn" onClick={() => setToggleMenu(state => !state)}>  {/* Adjust the width and height here */}
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

            { toggleMenu && <nav>
                <NavLink to="/" onClick={() => setToggleMenu(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setToggleMenu(false)}>About</NavLink>
                <NavLink to="/mail" onClick={() => setToggleMenu(false)}>Mail</NavLink>
                <NavLink to="/note" onClick={() => setToggleMenu(false)}>Note</NavLink>
            </nav> }
        </div>
    </header>
}

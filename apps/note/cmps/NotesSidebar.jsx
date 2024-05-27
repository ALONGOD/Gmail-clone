// import React from React;
const { Link, useLocation } = ReactRouterDOM;

export function NotesSidebar() {
    const location = useLocation();

    return (
        <div className="note-sidebar">
            <div className="note-sidebar-menu">
                <ul>
                    <li className={location.pathname === "/note" ? "active" : ""}>
                        <i className="far fa-lightbulb"></i>
                        <Link to="/note">Notes</Link>
                    </li>
                    <li className={location.pathname === "/note/reminders" ? "active" : ""}>
                        <i className="far fa-bell"></i>
                        <Link to="/note/reminders">Reminders</Link>
                    </li>
                    <li className={location.pathname === "/note/archive" ? "active" : ""}>
                        <i className="fas fa-archive"></i>
                        <Link to="/note/archive">Archive</Link>
                    </li>
                    <li className={location.pathname === "/note/trash" ? "active" : ""}>
                        <i className="fas fa-trash"></i>
                        <Link to="/note/trash">Trash</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

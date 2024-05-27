import { NoteFilter } from '../cmps/NoteFilter.jsx'

export function NoteHeader({ filterBy, onSetFilterBy, setToggleSidebar }) {
    return (
        <React.Fragment>
            <div className="header">
                <div className="sidebar-header">
                    <img
                        className="sidebar-menu-btn"
                        src="assets/img/menu-btn.svg"
                        onClick={() => setToggleSidebar(state => !state)}
                    />
                    <img
                        className="header-icon"
                        src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-keep-icon.png"
                    />
                    <article className="note-sidebar-keep">Keep</article>
                </div>
                    <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>
        </React.Fragment>
    );
}

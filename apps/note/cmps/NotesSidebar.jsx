// import React from React;

export function NotesSidebar() {
    return (
        <div className="note-sidebar">
            <div className="note-sidebar-header">
                <h2>Keep</h2>
            </div>
            <div className="note-sidebar-menu">
                <ul>
                    <li><i className="far fa-lightbulb"></i> <a href="#">Notes</a></li>
                    <li><i className="far fa-bell"></i> <a href="#">Reminders</a></li>
                    <li><i className="fas fa-archive"></i> <a href="#">Archive</a></li>
                    <li><i class="fas fa-trash"></i> <a href="#">Trash</a></li>
                </ul>
            </div>
        </div>
    );
}
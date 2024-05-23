const { Link } = ReactRouterDOM;
import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onRemove }) {
    if (!notes) return;

    return (
        <div>
            <ul>
                {notes.map(note => {
                    const backgroundColor = note.style && note.style.backgroundColor ? note.style.backgroundColor : 'yellow';
                    return (
                        <li key={note.id} className='note-card' style={{ backgroundColor }}>
                            <NotePreview note={note} />
                            <button onClick={() => onRemove(note.id)}>x</button>
                            <Link to={`/note/${note.id}`}><button>Details</button></Link>
                            <Link to={`/note/edit/${note.id}`}><button>Edit</button></Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

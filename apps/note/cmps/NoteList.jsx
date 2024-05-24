const { Link } = ReactRouterDOM;
import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onRemove, onPin, onDuplicate }) {
    if (!notes) return null;

    return (
        <div className="note-list">
            {notes.map(note => {
                const backgroundColor = note.style && note.style.backgroundColor ? note.style.backgroundColor : 'yellow';
                return (
                    <div key={note.id} className='note-card' style={{ backgroundColor }}>
                        <NotePreview note={note} />
                        <button onClick={() => onRemove(note.id)} className='fa fa-trash'></button>
                        <button onClick={() => onPin(note.id)} className={`fa ${note.isPinned ? 'fa-thumbtack' : 'fa-map-pin'}`}></button>
                        <button onClick={() => onDuplicate(note.id)} className='fa fa-clone'></button>
                        <Link to={`/note/${note.id}`}>
                            <button className='fa fa-info-circle'></button>
                        </Link>
                        <Link to={`/note/edit/${note.id}`}>
                            <button className='fa fa-edit'></button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}


const { Link } = ReactRouterDOM;
const { useState, useEffect } = React

import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onRemove, onPin, onDuplicate, onChangeColor }) {
    const [colorPickerVisibility, setColorPickerVisibility] = useState({});

    if (!notes) return null;

    const handleColorChange = (noteId, color) => {
        onChangeColor(noteId, color);
    };

    const toggleColorPicker = (noteId) => {
        setColorPickerVisibility(prevVisibility => ({
            ...prevVisibility,
            [noteId]: !prevVisibility[noteId]
        }));
    };

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
                        <Link to={`/note/edit/${note.id}`}>
                            <button className='fa fa-edit'></button>
                        </Link>
                        <button onClick={() => toggleColorPicker(note.id)} className='fa fa-paint-brush'></button>
                        {colorPickerVisibility[note.id] && (
                            <input
                                type="color"
                                onChange={(e) => handleColorChange(note.id, e.target.value)}
                                className='color-input'
                                style={{ display: 'inline-block', marginLeft: '10px' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}


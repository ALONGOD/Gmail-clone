const { Link } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;

import { NotePreview } from "../cmps/NotePreview.jsx";

export function NoteList({ notes, onRemove, onPin, onDuplicate, onChangeColor }) {
    const [colorPickerVisibility, setColorPickerVisibility] = useState({});

    const colorPalette = ['#FFEB3B', '#FFC107', '#FF5722', '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#4CAF50'];

    if (!notes) return null;

    const handleColorChange = (noteId, color) => {
        onChangeColor(noteId, color);
        toggleColorPicker(noteId); // Close the color picker
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
                        <div className="note-actions">
                            <button onClick={() => onRemove(note.id)} className='fa fa-trash'></button>
                            <button onClick={() => onPin(note.id)} className={`fa ${note.isPinned ? 'fa-thumbtack' : 'fa-map-pin'}`}></button>
                            <button onClick={() => onDuplicate(note.id)} className='fa fa-clone'></button>
                            <Link to={`/note/edit/${note.id}`} className="action-button">
                                <button className='fa fa-edit'></button>
                            </Link>
                            <button onClick={() => toggleColorPicker(note.id)} style={{ position: 'relative' }} className='fa fa-paint-brush'></button>
                            <Link to={`/mail/${note.id}`} className="action-button">
                                <button className='fa fa-envelope'></button>
                            </Link>
                        </div>
                        {colorPickerVisibility[note.id] && (
                            <div className='color-palette' style={{ position: 'absolute', top: '0', left: '40px', display: 'flex', flexDirection: 'row' }}>
                                {colorPalette.map(color => (
                                    <div
                                        key={color}
                                        className='color-option'
                                        style={{ backgroundColor: color, margin: '0 5px' }}
                                        onClick={() => handleColorChange(note.id, color)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

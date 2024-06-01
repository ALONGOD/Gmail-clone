import { utilService } from "../../../services/util.service";

const { useState, useEffect } = React

export function AddNote({ onAddNote }) {
    const [noteText, setNoteText] = useState('');
    const [noteTextTitle, setNoteTextTitle] = useState('');
    const [noteType, setNoteType] = useState('');
    const [noteColor, setNoteColor] = useState('#f8e5c5');
    const [imageUrl, setImageUrl] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [todoItems, setTodoItems] = useState(['']);
    const [videoUrl, setVideoUrl] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [audioTitle, setAudioTitle] = useState('');
    const [mapTitle, setMapTitle] = useState('');
    const [mapLat, setMapLat] = useState('');
    const [mapLng, setMapLng] = useState('');

    const handleNoteTypeChange = (type) => {
        setNoteType(type === noteType ? '' : type);
    };

    function handleSubmit(ev) {
        ev.preventDefault();
        let info;
        if (noteType === 'NoteImg') {
            info = { title: imageTitle, url: imageUrl };
        } else if (noteType === 'NoteTodos') {
            const todos = todoItems
                .filter(todo => todo.trim() !== '') // Filter out empty todos
                .map(todo => ({ txt: todo.trim(), doneAt: null })); // Map remaining todos
            info = { title: noteText, todos };
        } else if (noteType === 'NoteVideo') {
            info = { title: videoTitle, url: videoUrl };
        } else if (noteType === 'NoteAudio') {
            info = { title: audioTitle, url: audioUrl };
        } else if (noteType === 'NoteMap') {
            info = { title: mapTitle, coords: { lat: parseFloat(mapLat), lng: parseFloat(mapLng) } };
        } else {
            info = { title: noteTextTitle, txt: noteText };
        }
        const newNote = {
            type: noteType,
            info,
            createdAt: Date.now(),
            style: {
                backgroundColor: noteColor
            },
            isPinned: false
        };
        onAddNote && onAddNote(newNote);
        // Reset state
        setNoteText('');
        setNoteType('');
        setNoteColor('#f8e5c5'); // Reset to default color
        setImageUrl('');
        setImageTitle('');
        setTodoItems(['']);
        setVideoUrl('');
        setVideoTitle('');
        setAudioUrl('');
        setAudioTitle('');
        setNoteTextTitle('');
        setMapTitle('');
        setMapLat('');
        setMapLng('');
    }

    const handleTodoChange = (index, value) => {
        const newTodoItems = [...todoItems];
        newTodoItems[index] = value;
        setTodoItems(newTodoItems);

        if (index === todoItems.length - 1 && value.trim() !== '') {
            setTodoItems([...todoItems, '']);
        }
    };

    const renderFormInputs = () => {
        switch (noteType) {
            case 'NoteImg':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                type="text"
                                placeholder="Title..."
                                value={imageTitle}
                                onChange={(e) => setImageTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="URL..."
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteTodos':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        {todoItems.map((todo, index) => (
                            <label key={index} className="note-input-label">
                                <input
                                    placeholder={`Todo ${index + 1}...`}
                                    type="text"
                                    value={todo}
                                    onChange={(e) => handleTodoChange(index, e.target.value)}
                                    className="note-input"
                                />
                            </label>
                        ))}
                    </div>
                );
            case 'NoteVideo':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."
                                type="text"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="URL..."
                                type="text"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteAudio':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."
                                type="text"
                                value={audioTitle}
                                onChange={(e) => setAudioTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="URL..."
                                type="text"
                                value={audioUrl}
                                onChange={(e) => setAudioUrl(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteMap':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."
                                type="text"
                                value={mapTitle}
                                onChange={(e) => setMapTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="Latitude..."
                                type="text"
                                value={mapLat}
                                onChange={(e) => setMapLat(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="Longitude..."
                                type="text"
                                value={mapLng}
                                onChange={(e) => setMapLng(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            case 'NoteTxt':
                return (
                    <div className="note-inputs-container">
                        <label className="note-input-label">
                            <input
                                placeholder="Title..."
                                type="text"
                                value={noteTextTitle}
                                onChange={(e) => setNoteTextTitle(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                        <label className="note-input-label">
                            <input
                                placeholder="Text..."
                                type="text"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                required
                                className="note-input"
                            />
                        </label>
                    </div>
                );
            default:
                return (
                    <label className="note-input-label">
                        <input
                            placeholder="What's on your mind?..."
                            type="text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            required
                            className="note-input"
                            onClick={() => setNoteType("NoteTxt")}
                        />
                    </label>
                );
        }
    };

    return (
        <div className="note-container">
            <form className="note-form" onSubmit={handleSubmit}>
                {renderFormInputs()}
                <button type="submit" className="note-submit-button">Add Note</button>
            </form>
            <div className="note-type-icons">
                <i className={`fas fa-font note-type-icon ${noteType === 'NoteTxt' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteTxt')}></i>
                <i className={`far fa-list-alt note-type-icon ${noteType === 'NoteTodos' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteTodos')}></i>
                <i className={`far fa-image note-type-icon ${noteType === 'NoteImg' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteImg')}></i>
                <i className={`far fa-play-circle note-type-icon ${noteType === 'NoteVideo' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteVideo')}></i>
                <i className={`fas fa-music note-type-icon ${noteType === 'NoteAudio' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteAudio')}></i>
                <i className={`fas fa-map-marker-alt note-type-icon ${noteType === 'NoteMap' ? 'selected' : ''}`} onClick={() => handleNoteTypeChange('NoteMap')}></i>
            </div>
        </div>
    );
}
export function NoteAudio({ note }) {
    if (!note || !note.info) {
        return null;
    }
    console.log(note.info.url);

    return (
        <article className="note-audio" style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}>
            {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
            <div className="audio-container">
                <audio controls style={{ width: '220px', height: '70px' }}>
                    <source src={note.info.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>
        </article>
    );
}

export default NoteAudio;

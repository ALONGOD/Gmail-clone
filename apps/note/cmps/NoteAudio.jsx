export function NoteAudio({ note }) {
    // Ensure note and note.info exist
    console.log(note.info.url);
    if (!note || !note.info) {
        return null;
    }

    return (
        <article className="note-audio" style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}>
            {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
            <div className="audio-container">
                <iframe
                    src={note.info.url}
                    width="300"
                    height="70"
                    frameBorder="0"
                    allow="autoplay"
                >
                </iframe>
            </div>
        </article>
    );
}

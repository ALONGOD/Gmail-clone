export function NoteVideo({ note }) {
    // Ensure note and note.info exist
    if (!note || !note.info) {
        return null;
    }

    // Replace 'watch?v=' with 'embed/' in the URL
    const embedUrl = note.info.url.replace('watch?v=', 'embed/');

    return (
        <article className="note-video" style={note.style ? { backgroundColor: note.style.backgroundColor } : {}}>
            {note.info.title && <h2 className="note-title">{note.info.title}</h2>}
            <div className="video-container">
                <iframe
                    className="video"
                    width="300"
                    height="170"
                    src={embedUrl}
                    title={note.info.title}
                    allowFullScreen
                ></iframe>
            </div>
        </article>
    );
}

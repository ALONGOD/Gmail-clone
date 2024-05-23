export function NoteVideo({ note }) {
    return <h2>{note.info.title}</h2>
    {
        embedUrl && (
            <iframe
                width="200"
                height="150"
                src={embedUrl}
                title={note.info.title}
                allowFullScreen
            ></iframe>
        )
    }
}
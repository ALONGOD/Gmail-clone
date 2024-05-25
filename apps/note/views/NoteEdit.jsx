const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
import { noteService } from "../services/note.service.js"

const { Link } = ReactRouterDOM

export function NoteEdit() {
    const [note, setNote] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    const { noteId } = useParams();
    console.log(noteService.get(params.noteId))

    useEffect(() => {
        setIsLoading(true)
        noteService.get(params.noteId)
            .then(note => {
                console.log(note)
                setNote(note)
            })
            .catch(() => {
                alert('Couldnt get note...')
                navigate('/note')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [params.noteId])



    if (isLoading) return <h3>Loading...</h3>

    return (
        <div>
            <h1>Note Details</h1>
            <p>Note ID: {noteId}</p>
        </div>
    );
}
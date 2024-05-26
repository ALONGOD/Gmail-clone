import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteVideo } from '../cmps/NoteVideo.jsx'
import { NoteAudio } from '../cmps/NoteAudio.jsx'



export function NotePreview({ note }) {
    const componentMap = {
        NoteTxt,
        NoteImg,
        NoteVideo,
        NoteTodos,
        NoteAudio
    }
    const NoteComponent = componentMap[note.type]
    // console.log(NoteComponent)
    // console.log(note.type)
    return (
        <NoteComponent note={note} />
        // <article className="note-preview">
        //     <h3>{note.id}</h3>
        // </article>
    )
    // return <li>{note.title}</li>

}
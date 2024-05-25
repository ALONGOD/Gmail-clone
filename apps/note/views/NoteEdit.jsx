const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter

const { Link } = ReactRouterDOM

export function NoteEdit() {
    const { noteId } = useParams();
    return (
        <div>
            <h1>Note Details</h1>
            <p>Note ID: {noteId}</p>
        </div>
    );
}
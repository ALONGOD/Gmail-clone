const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, value } = target
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    const { search } = filterBy

    // return <div>hii</div>
    return (
        <section className="mail-filter flex flex-row">
            <input onChange={handleChange} value={search} name="search" type="text" placeholder="Search..." />
            <img src="assets/img/search-icon.png" />
        </section>
    )

}
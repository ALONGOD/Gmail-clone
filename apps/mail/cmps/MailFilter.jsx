import { utilService } from '../../../services/util.service.js'

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  // const debounceOnSearch = useRef(utilService.debounce())

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    const { name, value } = target
    setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
  }

  const { search } = filterBy

  return (
    <section className="mail-filter flex flex-row">
      <input onChange={handleChange} value={search} name="search" type="text" placeholder="Search email..." />
      <img src="assets/img/search-icon.png" />
    </section>
  )
}

import { utilService } from '../../../services/util.service.js'

const { useState, useEffect, useRef } = React
const { useLocation, useNavigate } = ReactRouter

export function MailFilter({ isMobile, setMailMainContent, filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    if (pathname.includes('details')) {
      setMailMainContent('mailList')
      navigate('/mail')
    }
    const { name, value } = target
    setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
  }

  const { search } = filterBy

  return (
    <section className="mail-filter flex flex-row">
      <input onChange={handleChange} value={search} name="search" type="text" placeholder="Search email..." />
      {!isMobile && <img src="assets/img/search-icon.png" />}
    </section>
  )
}

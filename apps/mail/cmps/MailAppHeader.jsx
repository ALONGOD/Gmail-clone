import { MailFilter } from './MailFilter'

export function MailAppHeader({ setToggleMenu, onSetFilterBy, filterBy }) {
  return (
    <React.Fragment>
      <div className="email-heading">
        <i className="sidebar-mail-btn fa-solid fa-bars" src="assets/img/menu-btn.svg" onClick={() => setToggleMenu(state => !state)}></i>
        <img src="assets/img/mail-img/Gmail_Logo.svg" alt="email-logo" className="email-logo" />
      </div>
      <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
    </React.Fragment>
  )
}

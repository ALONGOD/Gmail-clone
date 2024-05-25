import { MailFilter } from './MailFilter'

export function MailAppHeader({ setToggleSidebar }) {
  return (
    <div className="email-heading">
      <i className="sidebar-mail-btn fa-solid fa-bars" src="assets/img/menu-btn.svg" onClick={() => setToggleSidebar(state => !state)}></i>
      <img src="assets/img/mail-img/Gmail_Logo.svg" alt="email-logo" className="email-logo" />
    </div>
  )
}

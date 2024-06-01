import { MailFilter } from './MailFilter'

export function MailAppHeader({ isMobile, setToggleSidebar }) {
  return (
    <div className="email-heading">
      <i className="sidebar-mail-btn fa-solid fa-bars" src="assets/img/menu-btn.svg" onClick={() => setToggleSidebar(state => !state)}></i>
      {!isMobile && <img src="assets/img/mail-img/Gmail_Logo.svg" alt="email-logo" className="email-logo" />}
    </div>
  )
}

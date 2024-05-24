const { useState, useEffect } = React
// import gmailLogo from "../../../assets/img/mail-img";
import { MailFilter } from '../cmps/MailFilter.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { SidebarMenu } from '../cmps/SidebarMenu.jsx'
import { mailService } from '../services/mail.service.js'
import { MailAppHeader } from '../cmps/MailAppHeader.jsx'

export function MailIndex() {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [filterBy, setFilterBy] = useState({
    folder: 'inbox',
    search: '', // no need to support complex text search
    isRead: false, // (optional property, if missing: show all)
    isStarred: false, // (optional property, if missing: show all)
    lables: [], // has any of the labels
  })
  const [sidebarHover, setSidebarHover] = useState(false)
  const [emails, setEmails] = useState(null)

  useEffect(() => {
    loadMails()
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setEmails)
      .catch(err => console.log('err:', err))
  }

  function onToggleIsStar(mailId, isStar) {
    mailService
      .get(mailId)
      .then(mailToUpdate => {
        const mailIndex = emails.findIndex(mail => mail.id === mailId)

        if (mailIndex !== -1) {
          const updatedMails = [...emails]
          updatedMails[mailIndex] = { ...mailToUpdate, isStar: isStar }
          setEmails(updatedMails)
        }
        showSuccessMsg(`Mail marked as ${isStar ? 'starred' : 'unstarred'}! ${mailId}`)
        return mailService.save({ ...mailToUpdate, isStar: isStar })
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg("Error - coudn't mark as starred")
      })
  }

  function onToggleIsRead(mailId, isRead) {
    mailService
      .get(mailId)
      .then(mailToUpdate => {
        const mailIndex = emails.findIndex(mail => mail.id === mailId)

        if (mailIndex !== -1) {
          const updatedMails = [...emails]
          updatedMails[mailIndex] = { ...mailToUpdate, isRead: isRead }
          setEmails(updatedMails)
        }
        return mailService.save({ ...mailToUpdate, isRead: isRead })
      })
      .catch(err => {
        console.log('err:', err)
      })
  }

  function onRemove(mailId) {
    mailService.remove(mailId).then(setEmails(prevMails => prevMails.filter(mail => mail.id !== mailId)))
  }

  function onSetFilterBy(newFilter) {
    setFilterBy({ ...newFilter })
  }

  function countUnreadMails() {
    if (!emails) return
    const unreadMails = emails.filter(email => !email.isRead)
    return unreadMails.length
  }

  const hoveredSidebar = sidebarHover || toggleSidebar

  console.log(emails)

  return (
    <React.Fragment>
      {!emails ? (
        <h3>...Loading</h3>
      ) : (
        <div className={`email-grid ${hoveredSidebar ? 'sidebar-open' : ''}`}>
          <MailAppHeader setSidebarHover={setSidebarHover} setToggleSidebar={setToggleSidebar} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
          <MailList emails={emails} onRemove={onRemove} onToggleIsStar={onToggleIsStar} onToggleIsRead={onToggleIsRead} mails={emails} />
          <SidebarMenu hoveredSidebar={hoveredSidebar} toggleSidebar={toggleSidebar} sidebarHover={sidebarHover} setSidebarHover={setSidebarHover} filterBy={filterBy} onSetFilterBy={onSetFilterBy} unreadMails={countUnreadMails()} />
        </div>
      )}
    </React.Fragment>
  )
}

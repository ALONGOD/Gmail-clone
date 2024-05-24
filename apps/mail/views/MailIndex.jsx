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
    isRead: '', // (optional property, if missing: show all)
    isStarred: false, // (optional property, if missing: show all)
    lables: [], // has any of the labels
  })
  const [sidebarHover, setSidebarHover] = useState(false)
  const [emails, setEmails] = useState(null)
  const [unreadMailsCount, setUnreadMailsCount] = useState(0)

  useEffect(() => {
    loadMails()
  }, [filterBy])

  useEffect(() => {
    if (!emails) return
    setUnreadMailsCount(emails.filter(mail => !mail.isRead).length)
  }, [emails])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setEmails)
      .catch(err => console.log('err:', err))
  }

  console.log(unreadMailsCount)

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
        return mailService.save({ ...mailToUpdate, isStar: isStar })
      })
      .catch(err => {
        console.log('err:', err)
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
        mailService.save({ ...mailToUpdate, isRead: isRead })
      })
      .catch(err => {
        console.log('err:', err)
      })
    // .finally(
    //   countUnreadMails().then(count => {
    //     setUnreadMailsCount(count)
    //     console.log('finally')
    //   })
    // )
  }

  function onRemove(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setEmails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        showSuccessMsg(`Mail successfully removed!`)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg("Error - couldn't remove the mail")
      })
  }

  function onSetFilterBy(newFilter) {
    setFilterBy({ ...newFilter })
  }

  function countUnreadMails() {
    return mailService
      .query()
      .then(mails => {
        if (!mails) return 0
        const unreadMails = mails.filter(mail => !mail.isRead)
        console.log(unreadMails.length)
        // return unreadMails.length
        setUnreadMailsCount(unreadMails.length)
      })
      .catch(error => {
        console.error('Error fetching mails:', error)
        return 0
      })
  }

  const hoveredSidebar = sidebarHover || toggleSidebar

  return (
    <React.Fragment>
      {!emails ? (
        <h3>...Loading</h3>
      ) : (
        <div className={`email-grid ${hoveredSidebar ? 'sidebar-open' : ''}`}>
          <MailAppHeader setSidebarHover={setSidebarHover} setToggleSidebar={setToggleSidebar} onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
          <MailList emails={emails} onRemove={onRemove} onToggleIsStar={onToggleIsStar} onToggleIsRead={onToggleIsRead} mails={emails} />
          <SidebarMenu hoveredSidebar={hoveredSidebar} toggleSidebar={toggleSidebar} sidebarHover={sidebarHover} setSidebarHover={setSidebarHover} filterBy={filterBy} onSetFilterBy={onSetFilterBy} unreadMailsCount={unreadMailsCount} />
        </div>
      )}
    </React.Fragment>
  )
}

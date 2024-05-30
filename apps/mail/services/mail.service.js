import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
}

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getLoggedInUser,
  getEmptyMail,
  getFilterFromSearchParams,
  saveMails,
}

function getLoggedInUser() {
  return loggedinUser
}

function query(filterBy = {}) {
  return asyncStorageService.query(MAIL_KEY, 100).then(mails => {
    console.log(mails)
    if (filterBy.folder) {
      switch (filterBy.folder) {
        case 'inbox':
          mails = mails.filter(mail => mail.to === loggedinUser.email)
          break
        case 'starred':
          mails = mails.filter(mail => mail.isStar)
          break
        case 'sent':
          mails = mails.filter(mail => mail.from === loggedinUser.email)
          break
      }
    }

    if (filterBy.search) {
      const regExp = new RegExp(filterBy.search, 'i')
      mails = mails.filter(
        mail =>
          regExp.test(mail.subject) ||
          regExp.test(mail.body) ||
          regExp.test(mail.from) ||
          regExp.test(mail.to)
      )
      console.log(mails)
    }

    if (filterBy.isRead) {
      switch (filterBy.isRead) {
        case 'read':
          mails = mails.filter(mail => mail.isRead)
          break

        case 'unread':
          mails = mails.filter(mail => !mail.isRead)
          break
      }
    }

    mails = mails.sort((a, b) => b.sentAt - a.sentAt)
    console.log(mails)

    return mails
  })
}

function get(mailId) {
  return asyncStorageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return asyncStorageService.put(MAIL_KEY, mail)
  } else {
    return asyncStorageService.post(MAIL_KEY, mail)
  }
}

function getDefaultFilter(filterBy = { search: '', unread: 0 }) {
  return { search: filterBy.search, unread: filterBy.unread }
}

function _setNextPrevmailId(mail) {
  return asyncStorageService.query(MAIL_KEY).then(mails => {
    const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
    const nextmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevmail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextmailId = nextmail.id
    mail.prevmailId = prevmail.id
    return mail
  })
}

function _createMails() {
  let emails = storageService.loadFromStorage(MAIL_KEY)
  console.log(emails)
  if (!emails || !emails.length) {
    emails = []
    for (var i = 0; i < 20; i++) {
      emails.push({
        id: utilService.makeId(4),
        subject: utilService.generateRandomSubject(),
        body: utilService.generateRandomSentence(),
        isRead: false,
        sentAt: utilService.getRandomTimestamp('2022-12-01', '2024-05-22'),
        removedAt: null,
        isStar: false,
        from: utilService.generateRandomEmailSender(),
        to: 'user@appsus.com',
        type: 'inbox',
      })
    }
    storageService.saveToStorage(MAIL_KEY, emails)
  }
}

function saveMails(mails) {
  return Promise.resolve(asyncStorageService._save(MAIL_KEY, mails))
}

function getEmptyMail(subject = '', body = '', to = '') {
  return {
    id: '',
    subject,
    body,
    isRead: true,
    isStarred: false,
    sentAt: 0,
    removedAt: null,
    from: loggedinUser.email,
    to,
  }
}

function getFilterFromSearchParams(searchParams) {
  return {
    folder: searchParams.get('folder') || 'inbox',
    search: searchParams.get('search') || '',
    isRead: searchParams.get('isRead') || '',
    isStarred: searchParams.get('isStarred') || '',
  }
}

function getContentFromSearchParams(searchParams) {}

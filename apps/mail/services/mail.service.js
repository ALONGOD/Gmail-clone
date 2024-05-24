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
  getFilterFromSearchParams,
  getLoggedInUser,
}

function getLoggedInUser() {
  return loggedinUser
}

function query(filterBy = {}) {
  return asyncStorageService.query(MAIL_KEY).then(mails => {
    if (filterBy.search) {
      const regExp = new RegExp(filterBy.search, 'i')
      mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
      console.log(mails)
    }

    if (filterBy.folder) {
      switch (filterBy.folder) {
        case 'inbox':
          mails = mails.filter(mail => mail.type === 'inbox')
          break
        case 'starred':
          mails = mails.filter(mail => mail.isStar)
          break
        case '':
          break
      }
    }

    mails = mails.sort((a, b) => b.sentAt - a.sentAt)

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
  console.log(mail)
  if (mail.id) {
    return asyncStorageService.put(MAIL_KEY, mail)
  } else {
    return asyncStorageService.post(MAIL_KEY, mail)
  }
}

function getDefaultFilter(filterBy = { search: '', unread: 0 }) {
  return { search: filterBy.search, unread: filterBy.unread }
}

function getFilterFromSearchParams(searchParams) {
  return {
    search: searchParams.get('search') || '',
    unread: +searchParams.get('unread') || '',
  }
}

function _setNextPrevmailId(mail) {
  return asyncStorageService.query(MAIL_KEY).then(mails => {
    const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
    const nextmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevmail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
    mail.nextmailId = nextmail.id
    mail.prevmailId = prevmail.id
    return mail
  })
}

function _createMails() {
  let emails = storageService.loadFromStorage(MAIL_KEY)
  if (!emails || !emails.length) {
    emails = []
    for (var i = 0; i < 20; i++) {
      emails.push({
        id: utilService.makeId(4),
        subject: utilService.makeLorem(3),
        body: utilService.makeLorem(40),
        isRead: false,
        sentAt: utilService.getRandomTimestamp('2022-12-01', '2024-05-22'),
        removedAt: null,
        isStar: false,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        type: 'inbox',
      })
    }
    storageService.saveToStorage(MAIL_KEY, emails)
  }
}

function _createmail(vendor, maxSpeed = 250) {
  const mail = getEmptymail(vendor, maxSpeed)
  mail.id = utilService.makeId()
  return mail
}

// function getSpeedStats() {
//   return asyncStorageService.query(MAIL_KEY).then(mails => {
//     const mailCountBySpeedMap = _getmailCountBySpeedMap(mails)
//     const data = Object.keys(mailCountBySpeedMap).map(speedName => ({
//       title: speedName,
//       value: mailCountBySpeedMap[speedName],
//     }))
//     return data
//   })
// }

// function getVendorStats() {
//   return asyncStorageService.query(MAIL_KEY).then(mails => {
//     const mailCountByVendorMap = _getmailCountByVendorMap(mails)
//     const data = Object.keys(mailCountByVendorMap).map(vendor => ({
//       title: vendor,
//       value: Math.round((mailCountByVendorMap[vendor] / mails.length) * 100),
//     }))
//     return data
//   })
// }

// function _getmailCountBySpeedMap(mails) {
//   const mailCountBySpeedMap = mails.reduce(
//     (map, mail) => {
//       if (mail.maxSpeed < 120) map.slow++
//       else if (mail.maxSpeed < 200) map.normal++
//       else map.fast++
//       return map
//     },
//     { slow: 0, normal: 0, fast: 0 }
//   )
//   return mailCountBySpeedMap
// }

// function _getmailCountByVendorMap(mails) {
//   const mailCountByVendorMap = mails.reduce((map, mail) => {
//     if (!map[mail.vendor]) map[mail.vendor] = 0
//     map[mail.vendor]++
//     return map
//   }, {})
//   return mailCountByVendorMap
// }

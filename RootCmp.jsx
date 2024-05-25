const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { MailIndex } from './apps/mail/views/MailIndex.jsx'
import { NoteIndex } from './apps/note/views/NoteIndex.jsx'
import { NoteDetails } from './apps/note/views/NoteDetails.jsx'
import { NoteEdit } from './apps/note/views/NoteEdit.jsx'
import { MailDetails } from './apps/mail/views/MailDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AppNavigation } from './cmps/AppNavigation.jsx'
import { MailList } from './apps/mail/cmps/MailList.jsx'

export function App() {
  // const [mailMainContent, setMailMainContent] = useState('mailList')
  return (
    <Router>
      <section className="app">
        <AppNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/mail" element={<MailIndex />}>
            <Route path="/mail/details/:mailId" element={<MailDetails />} />
            <Route path="/mail/inbox" element={<MailList />} />
          </Route>

          <Route path="/note" element={<NoteIndex />} />
          <Route path="/note/edit/:noteId" element={<NoteEdit />} />
          <Route path="/note/:noteId" element={<NoteDetails />} />
        </Routes>
      </section>

      <UserMsg />
    </Router>
  )
}

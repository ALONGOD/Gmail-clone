import { utilService } from '../../../services/util.service.js'
import { MailToolsHover } from './MailToolsHover.jsx'
const { useNavigate } = ReactRouter
const { useSearchParams } = ReactRouterDOM

export function MailPreview({ setMailMainContent, email, mailToRemoveFolder, onToggleIsStar, onToggleIsRead, hoverMailId }) {
  const { subject, body, isRead, sentAt, from, to, isStar, id } = email
  const [ searchParams ] = useSearchParams()
  const navigate = useNavigate()

  const currentFolder = searchParams.get('folder')

  function mailDetailsNavigation(id, isRead) {
    if (!email.sentAt) {
      console.log('hi');
      return navigate({
        pathname: '/mail',
        search: `?compose=${email.id}`,
    })
    }
    onToggleIsRead(id, isRead)
    navigate(`/mail/details/${id}`)
    setMailMainContent('details')
  }

var leftColContent
  if (currentFolder === 'sent') {
   leftColContent = 'To: ' + to
} else if (currentFolder === 'inbox'){
   leftColContent = from
} else if (currentFolder === 'drafts') {
  leftColContent = 'Draft'
} else {
  leftColContent = from
}

  return (
    <React.Fragment>
      <div className="mail-options-1 flex flex-row align-center justify-center">
        <input type="checkbox" />
      </div>

      <div className="mail-preview" onClick={() => mailDetailsNavigation(id, true)}>
        <h3 className="email-sender">{leftColContent}</h3>
        <p className="mail-subject text-overflow-manage">
          {subject}
        </p>
        <p className="mail-body text-overflow-manage">
          {body}
        </p>
      </div>
      <div className="mail-tools flex flex-row align-center">
        {hoverMailId !== id && <h4 className="sent-at">{utilService.getTimeOfSent(sentAt)}</h4>}
        {hoverMailId === id && <MailToolsHover id={id} isRead={isRead} isStar={isStar} mailToRemoveFolder={mailToRemoveFolder} onToggleIsRead={onToggleIsRead} onToggleIsStar={onToggleIsStar} />}
      </div>
    </React.Fragment>
  )
}

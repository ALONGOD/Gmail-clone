export function ComposeButton({ hoveredSidebar, openNewCompose }) {
  return (
    <React.Fragment>
      <div onClick={openNewCompose} className="compose-btn flex flex-row align-center justify-center">
        <i className="fa-solid fa-pen"></i> {hoveredSidebar && <p>Compose</p>}
      </div>
    </React.Fragment>
  )
}

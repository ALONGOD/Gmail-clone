export function ComposeButton({ hoveredSidebar }) {
  return (
    <React.Fragment>
      <div className="compose-btn flex flex-row align-center justify-center">
        <i className="fa-solid fa-pen"></i> {hoveredSidebar && <p>Compose</p>}
      </div>
    </React.Fragment>
  )
}

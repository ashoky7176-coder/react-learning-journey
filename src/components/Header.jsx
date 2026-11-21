function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">S</span>
        <span>StudyTrack</span>
      </div>
      <div className="teacher-account">
        <span>Ms. Carter</span>
        <span className="teacher-avatar" aria-label="Ms. Carter">MC</span>
      </div>
    </header>
  );
}

export default Header;
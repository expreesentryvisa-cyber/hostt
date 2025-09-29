import { useState } from "react";
import { Link } from "react-router-dom";
import govLogo from "../logo-Photoroom2.png"; // replace with your logo path

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="main-header-new">
        <div className="header-top-bar">
          {/* Menu Button */}
          <button
            className="header-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
          >
            <svg
              className="menu-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
            </svg>
            <span>Menu</span>
          </button>

          {/* Logo and Title */}
          <div className="header-logo-title">
             <img src={govLogo} alt="Government Logo" className="vevo-logo" />
            <span className="header-title">Immigration and citizenship</span>
          </div>

          {/* Search Button */}
          <button
            className="header-search-btn"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </button>
        </div>

        {/* Bottom bar quick links */}
        <div className="header-bottom-bar">
          <div className="container">
            <Link to="/immiaccount">ImmiAccount</Link>
            <Link to="/vevo">Visa Entitlement Verification Online (VEVO)</Link>
            <Link to="/trs">My Tourist Refund Scheme (TRS)</Link>
          </div>
        </div>
      </header>

      {/* Slide-out mobile nav */}
      <div className={`mobile-nav-links ${menuOpen ? "active" : ""}`}>
        <button
          className="close-menu-btn"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/entering" onClick={() => setMenuOpen(false)}>Entering and leaving India</Link>
        <Link to="/visas" onClick={() => setMenuOpen(false)}>Visas</Link>
        <Link to="/citizenship" onClick={() => setMenuOpen(false)}>Indian citizenship</Link>
        <Link to="/changes" onClick={() => setMenuOpen(false)}>Change in your situation</Link>
        <Link to="/what-we-do" onClick={() => setMenuOpen(false)}>What we do</Link>
        <Link to="/settling" onClick={() => setMenuOpen(false)}>Settling in India</Link>
        <Link to="/support" onClick={() => setMenuOpen(false)}>Help and support</Link>
        <Link to="/news" onClick={() => setMenuOpen(false)}>News and media</Link>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="search-overlay">
          <button
            className="close-search-btn"
            onClick={() => setSearchOpen(false)}
            aria-label="Close search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>

          <div className="search-content">
            <svg
              className="search-input-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

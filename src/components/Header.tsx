import * as React from 'react';

const Header: React.SFC = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="#">
      WRAMTAS
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-item nav-link active" href="#">
          About <span className="sr-only">(current)</span>
        </a>
        <a className="nav-item nav-link" href="#">
          Affiliates
        </a>
        <a className="nav-item nav-link" href="#">
          Conferences
        </a>
        <a className="nav-item nav-link" href="#">
          Elections
        </a>
        <a className="nav-item nav-link" href="#">
          Scholarships
        </a>
        <a className="nav-item nav-link" href="#">
          Internship Spotlights
        </a>
        <a className="nav-item nav-link" href="#">
          Master Class
        </a>
        <a className="nav-item nav-link" href="#">
          Membership Resources
        </a>
      </div>
    </div>
  </nav>
);

export default Header;

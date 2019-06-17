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
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Blog <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="conferenceDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Conference
          </a>
          <div className="dropdown-menu" aria-labelledby="conferenceDropdown">
            <a className="dropdown-item" href="#">
              Regional Conference
            </a>
            <a className="dropdown-item" href="#">
              National Conference
            </a>
            <a className="dropdown-item" href="#">
              Presentation Proposals
            </a>
            <a className="dropdown-item" href="#">
              Scholarships
            </a>
          </div>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Elections
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Internships
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Master Class
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            Resources
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="#">
            About
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;

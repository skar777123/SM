import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
        {/* Container wrapper */}
        <div className="container-fluid">
          {/* Navbar brand */}

          {localStorage.getItem("token") ? (
            <Link className="navbar-brand mx-2" to="/homePost">
              <img
                className="navbar-logo"
                src="./favicon.ico"
                alt={<span />}
                style={{ width: "60px" }}
              />
              Konnect
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              <img
                className="navbar-logo"
                src="./favicon.ico"
                alt={<span />}
                style={{ width: "60px" }}
              />
              Konnect
            </Link>
          )}
          {/* Toggle button */}
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Left links */}
            <div className="leftSide">
              <div className="navbar-nav me-auto mb-2 mb-lg-0">
                <div className="nav-item">
                  {localStorage.getItem("token") ? (
                    <span />
                  ) : (
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  )}
                </div>

                <div className="nav-item">
                  {localStorage.getItem("token") ? (
                    <Link
                      className="nav-link active"
                      to="/login"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  )}
                </div>

                {/* Navbar dropdown */}
              </div>
            </div>
            {/* Left links */}
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>
      {/* Navbar */}
    </div>
  );
}

export default Navbar;

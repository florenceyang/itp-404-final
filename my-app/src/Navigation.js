import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          PLAN IT
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          {/* {!isLoading && (
            <div className="d-flex">
              {isAuthenticated ? (
                <LogoutButton />
              ) : (
                <>
                  <LoginButton />
                  <SignUpButton />
                </>
              )}
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}

import { Link, NavLink } from "react-router-dom";

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
              <NavLink exact={true} to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to={`/today/${new Date().getDay()}`}
                className="nav-link"
              >
                Today's Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/about" className="nav-link">
                About
              </NavLink>
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

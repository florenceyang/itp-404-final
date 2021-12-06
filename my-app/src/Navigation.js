import { Link, NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand brand_title">
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
              <NavLink
                exact
                to={`/tomorrow/${new Date().getDay()}`}
                className="nav-link"
              >
                Tomorrow's Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to={`/urgent/`} className="nav-link">
                Urgent Tasks
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

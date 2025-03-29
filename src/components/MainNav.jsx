import { NavLink, useNavigate } from "react-router";
import Header from "./Header";
import classes from "./MainNav.module.css";

const MainNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Header />
      <nav>
        <ul className={classes.navList}>
          <li className={classes.navItem}>
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Todos
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              New Todo
            </NavLink>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MainNav;

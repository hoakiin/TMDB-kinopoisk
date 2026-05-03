import { NavLink, useLocation } from "react-router";
import logo from "../../../assets/logo.svg";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { MoonIcon } from "../../../common/icons/MoonIcon";
import { SunIcon } from "../../../common/icons/SunIcon";
import { Path } from "../../Routing";
import { changeThemeModeAC, selectThemeMode } from "../../tmdb-slice";
import s from "./Header.module.css";

const navItems = [
  { to: Path.Main, label: "Main" },
  { to: "/movies/popular", label: "Category movies" },
  { to: Path.FilteredMovies, label: "Filtered movies" },
  { to: Path.Search, label: "Search" },
  { to: Path.Favorites, label: "Favorites" },
];

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const location = useLocation();
  const isMainPage = location.pathname === Path.Main;
  const dispatch = useAppDispatch()

  const changeMode = () => {
    const newTheme = themeMode === "light" ? "dark" : "light"
    dispatch(changeThemeModeAC({ themeMode: newTheme }))
  }

  const isCategoryMoviesActive = (pathname: string) => {
    return pathname.startsWith("/movies")
  }

  return (
    <header className={`${s.header} ${isMainPage ? s.transparent : ""}`}>
      <div className={s.container}>
        <NavLink to={Path.Main}>
          <img src={logo} className={s.logo} />
        </NavLink>

        <nav>
          <ul className={s.list}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => {
                    if (item.to === "/movies/popular") {
                      return `link ${isCategoryMoviesActive(location.pathname) ? s.activeLink : s.listItem}`
                    }
                    return `link ${isActive ? s.activeLink : s.listItem}`
                  }}
                  end={item.to === Path.Main}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button onClick={changeMode}>
          {themeMode === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};

import HeaderStyle from "./style";
import { Link, NavLink } from "react-router-dom";
import { RiMenuFill, RiCloseFill, RiUser3Line } from "react-icons/ri";
import { useCallback, useState } from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { logUserOut, selectUser } from "../../../store/userSlice";
import { usersImagesBaseURL } from "../../../utils/env";
import { useAppDispatch } from "../../../store/hooks";
import { toast } from "react-toastify";
import { SuccessfulToastIcon } from "../Toast";

const Header = ({
  headerStyle = "default",
}: {
  headerStyle?: "blue" | "default";
}) => {
  const { user } = useSelector(selectUser);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onLogoutHandler = useCallback(() => {
    dispatch(logUserOut())
      .then(() => {
        toast.success("Logged out successfuly", { icon: SuccessfulToastIcon });
      })
      .catch((err) => {
        toast.error(
          err?.response?.message || "Error occured. Please try again"
        );
      });
  }, [dispatch]);

  return (
    <HeaderStyle headerStyle={headerStyle}>
      <div className="header__logo">
        <Logo
          stopColor1={headerStyle === "blue" ? "#fff" : "#4F7BC5"}
          stopColor2={headerStyle === "blue" ? "#fff" : "#59C4FB"}
        />
      </div>
      <nav
        className={`header__main_nav${
          isMenuExpanded ? ` header__main_nav--expanded` : ""
        }`}
      >
        <div className="header__mob_nav_switcher header__mob_nav_close">
          <button type="button" onClick={() => setIsMenuExpanded(false)}>
            <RiCloseFill />
          </button>
        </div>
        {user && (
          <li className="header__profile_name">
            <div className="header__profile_img">
              {user.image ? (
                <img src={`${usersImagesBaseURL}/${user.image}`} alt="" />
              ) : (
                <RiUser3Line />
              )}
            </div>
            <span>{user.name}</span>
          </li>
        )}
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/rooms">Rooms</NavLink>
        </li>
        {user && (
          <>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <button type="button" onClick={onLogoutHandler}>
                Logout
              </button>
            </li>
          </>
        )}
      </nav>
      <nav className="header__profile_nav">
        {user ? (
          <li className="header__profile_name">
            <div className="header__profile_img">
              {user.image ? (
                <img src={`${usersImagesBaseURL}/${user.image}`} alt="" />
              ) : (
                <RiUser3Line />
              )}
            </div>
            <span>{user.name}</span>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </nav>
      <div className="header__mob_nav_switcher">
        <button type="button" onClick={() => setIsMenuExpanded(true)}>
          <RiMenuFill />
        </button>
      </div>
    </HeaderStyle>
  );
};

export default Header;

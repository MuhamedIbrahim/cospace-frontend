import { RiBuilding3Line, RiInformationLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import ProfileSidebarStyle from "./style";

const ProfileSidebar = () => {
  return (
    <ProfileSidebarStyle>
      <li>
        <NavLink to="/profile" end>
          <i>
            <RiInformationLine />
          </i>
          Info
        </NavLink>
      </li>
      <li>
        <NavLink to="/profile/bookings">
          <i>
            <RiBuilding3Line />
          </i>
          Bookings
        </NavLink>
      </li>
    </ProfileSidebarStyle>
  );
};

export default ProfileSidebar;

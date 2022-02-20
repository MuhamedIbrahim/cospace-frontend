import { Outlet } from "react-router-dom";
import { ProfileContent } from "../containers";
import ProfileSidebar from "../ProfileSidebar";
import ProfilePageStyle from "./style";

const ProfilePage = () => {
  return (
    <>
      <ProfilePageStyle>
        <ProfileSidebar />
        <ProfileContent>
          <Outlet />
        </ProfileContent>
      </ProfilePageStyle>
    </>
  );
};

export default ProfilePage;

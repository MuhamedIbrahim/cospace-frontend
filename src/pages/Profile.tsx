import {
  ContentWrapper,
  OriginalWrapper,
} from "../components/containers/containers";
import ProfilePage from "../components/profile/ProfilePage";
import Header from "../components/ui/Header";
import useRestrictedRoute from "../utils/hooks/useRestrictedRoute";

const Profile = () => {
  const { user } = useRestrictedRoute({
    navigateTo: "/",
    isLoggedIn: true,
  });

  return user ? (
    <>
      <Header headerStyle="blue" />
      <ContentWrapper>
        <OriginalWrapper
          style={{
            backgroundColor: "#F6F9FE",
            paddingBottom: "40px",
            paddingTop: "40px",
          }}
        >
          <ProfilePage />
        </OriginalWrapper>
      </ContentWrapper>
    </>
  ) : (
    <></>
  );
};

export default Profile;

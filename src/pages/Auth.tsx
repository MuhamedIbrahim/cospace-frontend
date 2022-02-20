import AuthPage from "../components/auth/AuthPage";
import { ContentWrapper } from "../components/containers/containers";
import useRestrictedRoute from "../utils/hooks/useRestrictedRoute";

const Rooms = ({ type }: { type: "login" | "signup" | "resetPassword" }) => {
  const { user, isManualLogging } = useRestrictedRoute({
    navigateTo: "/",
    isLoggedIn: false,
  });

  return !user || (user && isManualLogging) ? (
    <ContentWrapper
      style={{
        backgroundColor: "#F6F9FE",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AuthPage type={type} />
    </ContentWrapper>
  ) : (
    <></>
  );
};

export default Rooms;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../store/userSlice";

const useRestrictedRoute = ({
  navigateTo,
  isLoggedIn,
}: {
  navigateTo: string;
  isLoggedIn: boolean;
}) => {
  const { user, isManualLogging } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn ? !user : user && !isManualLogging) navigate(navigateTo);
  }, [user, navigate, isLoggedIn, isManualLogging, navigateTo]);

  return {
    user,
    isManualLogging,
  };
};

export default useRestrictedRoute;

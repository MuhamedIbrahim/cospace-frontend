import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import Rooms from "./Rooms";
import Auth from "./Auth";
import Profile from "./Profile";
import ProfileInfo from "../components/profile/ProfileInfo";
import Toast from "../components/ui/Toast";
import ProfileBookings from "../components/profile/ProfileBookings";
import Page404 from "./Page404";

const AppRoutes = () => {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/profile" element={<Profile />}>
          <Route path="bookings" element={<ProfileBookings />} />
          <Route index element={<ProfileInfo />} />
        </Route>
        <Route
          path="/reset-password/:passwordResetToken"
          element={<Auth type="resetPassword" />}
        />
        <Route path="/signup" element={<Auth type="signup" />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/rooms">
          <Route path=":roomSlug" element={<Room />} />
          <Route index element={<Rooms />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

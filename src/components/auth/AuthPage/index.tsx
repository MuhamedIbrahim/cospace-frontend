import { Link } from "react-router-dom";
import Logo from "../../ui/Logo";
import Login from "../Login";
import ResetPassword from "../ResetPassword";
import Signup from "../Signup";
import AuthPageStyle from "./style";

const AuthPage = ({ type }: { type: "login" | "signup" | "resetPassword" }) => {
  return (
    <AuthPageStyle>
      <div className="auth_page_box">
        <Link to="/" className="auth_logo">
          <Logo stopColor1="#4F7BC5" stopColor2="#59C4FB" />
        </Link>
        <div className="auth_content">
          {type === "login" && <Login />}
          {type === "signup" && <Signup />}
          {type === "resetPassword" && <ResetPassword />}
        </div>
      </div>
      <Link
        to={type === "login" ? "/signup" : "/login"}
        className="auth_content__link"
        style={{
          color: "var(--darkGrey2)",
          display: "block",
          width: "fit-content",
          margin: "10px auto 0",
        }}
      >
        {type === "login" ? "New user? Signup" : "Already a user? Login"}
      </Link>
    </AuthPageStyle>
  );
};

export default AuthPage;

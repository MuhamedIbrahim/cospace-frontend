import { RiCheckboxCircleFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      draggable={false}
      hideProgressBar={true}
      style={{ width: "90%", maxWidth: "450px" }}
    />
  );
};

export const SuccessfulToastIcon = (
  <RiCheckboxCircleFill style={{ color: "var(--green)", fontSize: "30px" }} />
);

export default Toast;

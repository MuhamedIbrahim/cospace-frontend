import { RiCheckboxCircleLine } from "react-icons/ri";
import ResponseMessageStyle from "./style";

const ResponseMessage = ({
  message,
  type,
}: {
  message: string;
  type: "success";
}) => {
  return (
    <ResponseMessageStyle>
      <span>{type === "success" && <RiCheckboxCircleLine />}</span>
      <span>{message}</span>
    </ResponseMessageStyle>
  );
};

export default ResponseMessage;

import styled from "styled-components";

const ResponseMessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--green);
  text-align: center;
  margin-bottom: 10px;
  span:first-child {
    font-size: 70px;
    line-height: 40px;
  }
  span:last-child {
    font-size: 15px;
    font-weight: 500;
    margin-top: 10px;
  }
`;

export default ResponseMessageStyle;

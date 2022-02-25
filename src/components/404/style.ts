import styled from "styled-components";

const NotFoundPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-bottom: 70px;
  h1 {
    font-size: 80px;
    font-weight: 800;
    color: var(--purple);
    margin: 0 0 10px;
  }
  p {
    margin: 0;
    color: var(--lightGrey6);
  }
`;

export default NotFoundPageStyle;

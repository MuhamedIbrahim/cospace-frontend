import styled from "styled-components";

const AuthPageStyle = styled.section`
  width: 90%;
  max-width: 450px;
  .auth_page_box {
    background-color: var(--white);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    padding: 20px;
  }
  .auth_logo {
    display: block;
    width: 150px;
    margin: 0 auto 30px;
  }
  .auth_content {
    h1 {
      text-align: center;
      font-weight: 500;
      font-size: 25px;
      color: var(--darkBlue);
      margin: 0 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        margin-top: 3px;
        margin-right: 7px;
        font-size: 17px;
        width: 30px;
        height: 30px;
      }
    }
  }
  .auth_content__fields {
    margin-bottom: 20px;
  }
  .auth_content__link {
    color: var(--purple);
    display: inline-block;
    padding: 0;
    border: none;
    background: none;
    outline: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .auth_content__submit {
    margin-top: 20px;
    button {
      width: 100%;
    }
  }
`;

export default AuthPageStyle;

import styled from "styled-components";

const ProfileInfoStyle = styled.form`
  .profile_info__upload {
    display: flex;
    align-items: center;
    label {
      flex: 1;
      max-width: 180px;
      cursor: pointer;
      margin: 0;
      font-weight: 500;
      color: var(--darkGrey2);
      text-align: center;
      &::after {
        content: "";
        margin-top: 6px;
        display: block;
        width: 100%;
        height: 1.5px;
        background-color: var(--darkGrey2);
      }
      input {
        display: none;
      }
    }
  }
  .profile_info__image {
    margin-right: 20px;
    width: 65px;
    height: 65px;
    background-color: var(--lightGrey2);
    border: 1px solid var(--lightGrey5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--darkGrey2);
    font-size: 19px;
    img {
      width: 65px;
      height: 65px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
`;

export default ProfileInfoStyle;

import styled from "styled-components";

const ProfileSidebarStyle = styled.ul`
  ${(props) => props.theme.breakpoints.lgDown} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.lgUp} {
    width: 30%;
  }
  background: var(--purple);
  background: linear-gradient(
    135deg,
    rgba(79, 123, 197, 1) 50%,
    rgba(89, 196, 251, 1) 100%
  );
  border-radius: 3px 0 0 3px;
  padding: 30px 0;
  li {
    &:not(:last-child) a {
      margin-bottom: 10px;
    }
    a {
      display: block;
      padding: 10px 20px;
      color: var(--lightGrey3);
      transition: 0.2s color;
      display: inline-flex;
      align-items: center;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 3px;
        background-color: var(--white);
        border-radius: 2px;
        opacity: 0;
        transition: 0.2s opacity;
      }
      &:hover,
      &.active {
        text-decoration: none;
        color: var(--white);
        position: relative;
        &::before {
          opacity: 1;
        }
      }
      i {
        font-size: 17px;
        margin-right: 5px;
      }
    }
  }
`;

export default ProfileSidebarStyle;

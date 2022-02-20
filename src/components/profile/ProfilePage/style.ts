import styled from "styled-components";

const ProfilePageStyle = styled.div`
  height: 100%;
  display: flex;
  ${(props) => props.theme.breakpoints.lgDown} {
    flex-direction: column;
  }
  background-color: var(--white);
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
`;

export default ProfilePageStyle;

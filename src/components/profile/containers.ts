import styled from "styled-components";

export const ProfileContent = styled.div`
  ${(props) => props.theme.breakpoints.lgDown} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.lgUp} {
    width: 70%;
  }
  padding: 30px 40px;
  overflow-y: auto;
  .profile__section_title {
    font-size: 23px;
    font-weight: 600;
    color: var(--darkGrey);
    margin: 0 0 30px;
  }
  .profile__sub_section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
`;

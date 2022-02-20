import styled from "styled-components";

const RoomProfileStyle = styled.div`
  padding: 20px var(--containerLgPadding) 40px;
  ${(props) => props.theme.breakpoints.lgDown} {
    padding: 20px var(--containerMdPadding) 40px;
  }
  .room_section__title {
    font-weight: 600;
    font-size: 23px;
    color: var(--darkGrey);
    margin: 40px 0 5px;
  }
  .room_section__subtitle {
    margin: 0;
    color: var(--lightGrey6);
  }
`;

export default RoomProfileStyle;

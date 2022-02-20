import styled from "styled-components";

const RoomAmmenitiesStyle = styled.div`
  .room_ammenities {
    display: flex;
    flex-wrap: wrap;
    margin: 15px -10px -10px;
  }
  .room_ammenities_single {
    padding: 10px;
    width: calc(100% / 3);
  }
  .room_ammenities_single_content {
    background-color: var(--white);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
    border-radius: 3px;
    padding: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--lightGrey6);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default RoomAmmenitiesStyle;

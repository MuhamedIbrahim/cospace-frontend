import styled from "styled-components";

const RoomCalendarStyle = styled.div`
  position: relative;
  height: 100%;
  .calendar__date {
    padding: 10px 30px 20px;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .calendar__date_day {
    span {
      color: var(--lightGrey5);
      font-size: 12px;
    }
    p {
      margin: 0;
      color: var(--darkGrey);
      font-weight: 600;
      font-size: 18px;
    }
  }
  .calendar__date_controllers {
    button {
      padding: 0;
      outline: none;
      border: none;
      background-color: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      font-size: 20px;
      color: var(--purple);
      transition: 0.2s background-color;
      svg {
        transition: 0.2s transform;
      }
      &:hover {
        background-color: #4f7bc520;
        svg {
          transform: scale(1.15);
        }
      }
    }
  }
`;

export default RoomCalendarStyle;

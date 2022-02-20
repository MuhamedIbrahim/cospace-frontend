import styled from "styled-components";

const RoomCalendarTableStyle = styled.table`
  ${(props) => props.theme.breakpoints.lgUp} {
    height: calc(100% - 90px);
  }
  width: 100%;
  tr {
    border-top: 1px solid var(--lightGrey4);
    position: relative;
    td {
      transition: 0.2s background-color;
      font-size: 14px;
      ${(props) => props.theme.breakpoints.lgDown} {
        height: 50px;
      }
      &:first-child {
        border-right: 1px solid var(--lightGrey4);
        width: 120px;
        white-space: nowrap;
        span {
          position: absolute;
          top: 0;
          left: 25px;
          transform: translate(0, -60%);
          background-color: var(--white);
          padding: 0 5px;
          font-weight: 500;
          color: var(--lightGrey6);
        }
      }
    }
    &.last_timing__row {
      td {
        height: 20px;
      }
    }
    &:not(.last_timing__row) .off {
      text-align: center;
      color: var(--lightGrey5);
    }
    &:not(.last_timing__row) .on {
      cursor: pointer;
      text-align: center;
      color: var(--purple);
      background-color: #4f7bc510;
      &:hover {
        background-color: #4f7bc520;
      }
    }
  }
`;

export default RoomCalendarTableStyle;

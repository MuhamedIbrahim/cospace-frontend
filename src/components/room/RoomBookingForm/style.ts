import styled from "styled-components";

const RoomBookingFormStyle = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${(props) => props.theme.breakpoints.lgUp} {
    height: 100%;
  }
  .form_header {
    display: flex;
    align-items: center;
    padding: 20px 30px;
    height: 90px;
    border-bottom: 1px solid var(--lightGrey4);
    p {
      margin: 0 0 0 10px;
      color: var(--darkGrey);
      font-weight: 600;
      font-size: 18px;
    }
  }
  .form_section {
    padding: 0 30px;
    margin-top: 20px;
    &:not(:last-child) {
      border-bottom: 1px solid var(--lightGrey2);
      padding-bottom: 20px;
    }
  }
  .form_section__row {
    margin: -10px;
    display: flex;
    flex-wrap: wrap;
  }
  .form_section__col {
    padding: 10px;
  }
  .form_section__label {
    font-size: 15px;
    font-weight: 500;
    color: var(--darkGrey2);
  }
  .form_section__text {
    font-weight: 600;
    color: var(--darkGrey);
    margin: 0;
    i {
      margin-right: 10px;
      font-size: 18px;
      color: var(--purple2);
    }
  }
  .form_bottom_body {
    margin-top: 40px;
    display: flex;
    align-items: flex-end;
    button {
      width: 50%;
      border-radius: 0;
      height: 70px;
      &:first-child {
        border-right: var(--white);
        border-left: var(--white);
        border-bottom: var(--white);
      }
    }
  }
`;

export default RoomBookingFormStyle;

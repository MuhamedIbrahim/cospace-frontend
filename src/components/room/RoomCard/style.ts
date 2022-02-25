import styled from "styled-components";

const RoomCardStyle = styled.div`
  display: flex;
  margin-top: 30px;
  border: 1px solid var(--lightGrey3);
  border-radius: 3px;
  ${(props) => props.theme.breakpoints.smDown} {
    flex-wrap: wrap;
  }
  a:hover {
    text-decoration: none;
  }
  .card_image {
    position: relative;
    display: block;
    ${(props) => props.theme.breakpoints.smDown} {
      width: 100%;
    }
    .card_image__tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: #effcf2;
      color: #09b536;
      padding: 2px 5px;
      font-size: 13px;
      border-radius: 3px;
    }
    img {
      width: 260px;
      height: 100%;
      object-fit: cover;
      ${(props) => props.theme.breakpoints.smDown} {
        width: 100%;
        height: 200px;
      }
    }
  }
  .card_info {
    position: relative;
    padding: 20px;
    h2 {
      color: var(--darkGrey);
      margin: 0;
    }
    .card_info__address {
      color: var(--lightGrey6);
      margin: 0 0 10px;
    }
    .card_info__rating {
      margin-bottom: 10px;
      color: var(--orange);
    }
    .card_info__ammenities {
      margin: 0;
      color: var(--lightGrey6);
      font-size: 15px;
      span:not(:last-child)::after {
        content: "•";
        margin: 0 7px;
        font-size: 13px;
        display: inline-block;
      }
    }
  }
  .card_info__ask_review {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 3;
  }
`;

export default RoomCardStyle;

export const AddReviewCardStyle = styled.form`
  margin-top: 10px;
  border: 1px solid var(--lightGrey3);
  border-radius: 3px;
  padding: 20px;
  position: relative;
  label {
    font-size: 15px;
    font-weight: 500;
    color: var(--darkGrey2);
  }
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
  .card__close {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
  }
  .card__rating {
    button {
      color: var(--orange);
    }
  }
`;

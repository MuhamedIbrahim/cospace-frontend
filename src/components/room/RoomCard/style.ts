import { Link } from "react-router-dom";
import styled from "styled-components";

const RoomCardStyle = styled(Link)`
  display: flex;
  margin-top: 30px;
  border: 1px solid var(--lightGrey3);
  border-radius: 3px;
  ${(props) => props.theme.breakpoints.smDown} {
    flex-wrap: wrap;
  }
  &:hover {
    text-decoration: none;
  }
  .card_image {
    position: relative;
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
      span:not(:last-child)::after {
        content: "•";
        margin: 0 7px;
        font-size: 13px;
        display: inline-block;
      }
    }
  }
`;

export default RoomCardStyle;

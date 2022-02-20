import styled from "styled-components";

const RoomReviewsStyle = styled.div`
  .room_reviews {
    margin-top: 25px;
  }
  .room_reviews__single {
    display: flex;
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  .room_reviews__single_image {
    width: 45px;
    height: 45px;
    background-color: var(--lightGrey4);
    border: 1px solid var(--lightGrey5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--darkGrey);
    font-size: 19px;
    img {
      width: 45px;
      height: 45px;
      object-fit: cover;
      border-radius: 50%;
    }
  }
  .room_reviews__single_info {
    flex: 1;
    margin-left: 15px;
  }
  .room_reviews__single_user {
    font-weight: 500;
    margin: 0;
    color: var(--darkGrey);
  }
  .room_reviews__single_rating {
    color: var(--orange);
  }
  .room_reviews__single_review {
    color: var(--darkGrey2);
    margin: 0;
  }
`;

export default RoomReviewsStyle;

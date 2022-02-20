import { RiUser3Line, RiStarLine, RiStarFill } from "react-icons/ri";
import { usersImagesBaseURL } from "../../../../utils/env";
import { Review } from "../../../../utils/Types";
import RoomReviewsStyle from "./style";

const RoomReviews = ({ reviews }: { reviews: Review[] | undefined }) => {
  return reviews ? (
    <RoomReviewsStyle>
      <h2 className="room_section__title">Reviews</h2>
      <p className="room_section__subtitle">
        {reviews.length > 0
          ? "Check what people say about this room"
          : "No reviews at the moment"}
      </p>
      {reviews.length > 0 && (
        <div className="room_reviews">
          {reviews.map((review) => (
            <div key={review._id} className="room_reviews__single">
              <div className="room_reviews__single_image">
                {typeof review.user === "object" && review.user.image ? (
                  <img
                    src={`${usersImagesBaseURL}/${review.user.image}`}
                    alt=""
                  />
                ) : (
                  <RiUser3Line />
                )}
              </div>
              <div className="room_reviews__single_info">
                <p className="room_reviews__single_user">
                  {typeof review.user === "object" ? review.user.name : null}
                </p>
                <div className="room_reviews__single_rating">
                  {new Array(5)
                    .fill(1)
                    .map((_, index) => (index < review.rating ? 1 : 0))
                    .map((el, index) =>
                      el === 1 ? (
                        <RiStarFill key={index} />
                      ) : (
                        <RiStarLine key={index} />
                      )
                    )}
                </div>
                <p className="room_reviews__single_review">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </RoomReviewsStyle>
  ) : null;
};

export default RoomReviews;

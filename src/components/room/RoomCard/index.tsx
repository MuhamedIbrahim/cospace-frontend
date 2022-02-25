import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCloseLine, RiStarFill, RiStarLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import appAxios from "../../../utils/appAxios";
import { roomsImagesBaseURL } from "../../../utils/env";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import { Room } from "../../../utils/Types";
import Button from "../../ui/Button";
import InputField from "../../ui/inputs/InputField";
import { SuccessfulToastIcon } from "../../ui/Toast";
import RoomCardStyle, { AddReviewCardStyle } from "./style";

const RoomCard = ({
  room,
  roomTag = "Available",
  hideReviews = false,
  askToAddReview = false,
}: {
  room: Room;
  roomTag?: string;
  hideReviews?: boolean;
  askToAddReview?: boolean;
}) => {
  const [isRoomReviewed, setIsRoomReviewed] = useState<{
    flag: boolean;
    isOpen: boolean;
  }>({ flag: !askToAddReview, isOpen: false });
  const {
    handleSubmit,
    watch,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 4,
      review: "",
    },
  });
  const watchedReview = watch();
  const { submissionState, setSubmissionState } = useSubmissionState();

  const onToggleViewReviewCard = useCallback(
    (open) => {
      setIsRoomReviewed((current) => ({ flag: current.flag, isOpen: open }));
      if (!open) reset();
    },
    [reset]
  );

  const onSubmitReviewHandler = useCallback(
    async (data) => {
      setSubmissionState({
        isSubmitting: true,
        successfulSubmission: false,
        errorSubmission: "",
      });
      let success = false,
        error = "";

      await appAxios
        .post("/review", {
          room: room._id,
          review: data.review.trim(),
          rating: data.rating + 1,
        })
        .then(() => {
          toast.success("Review is added successfuly", {
            icon: SuccessfulToastIcon,
          });
          setIsRoomReviewed({ flag: true, isOpen: false });
        })
        .catch((err) => {
          error =
            err?.response?.data?.message || "Error occured! Please try again";
          toast.error(error);
        });
      setSubmissionState({
        isSubmitting: false,
        successfulSubmission: success,
        errorSubmission: error,
      });
    },
    [room._id, setSubmissionState]
  );

  return (
    <>
      <RoomCardStyle>
        <Link to={`/rooms/${room.slug}`} className="card_image">
          {roomTag && <span className="card_image__tag">{roomTag}</span>}
          <img src={`${roomsImagesBaseURL}/${room.image}`} alt="" />
        </Link>
        <div
          className="card_info"
          {...(!isRoomReviewed.flag
            ? { style: { paddingBottom: "80px" } }
            : {})}
        >
          <Link to={`/rooms/${room.slug}`}>
            <h2>{room.name}</h2>
            <p className="card_info__address">{room.title}</p>
            {!hideReviews && (
              <div className="card_info__rating">
                {new Array(5)
                  .fill(1)
                  .map((_, index) => (index < room.rating ? 1 : 0))
                  .map((el, index) =>
                    el === 1 ? (
                      <RiStarFill key={index} />
                    ) : (
                      <RiStarLine key={index} />
                    )
                  )}{" "}
                ({room.ratingsQuantity})
              </div>
            )}
            <p className="card_info__ammenities">
              {room.ammenities
                .filter((_: string, index: number) => index < 3)
                .map((el: string, index: number) => (
                  <span key={index}>{el}</span>
                ))}
            </p>
          </Link>
          {!isRoomReviewed.flag && (
            <Button
              label="Add review"
              buttonType="button"
              styleType="secondary_blue"
              size="md"
              fullRadius={true}
              className="card_info__ask_review"
              onClick={() => onToggleViewReviewCard(true)}
            />
          )}
        </div>
      </RoomCardStyle>
      {isRoomReviewed.isOpen && (
        <AddReviewCardStyle
          onSubmit={handleSubmit(onSubmitReviewHandler)}
          noValidate={true}
        >
          <Button
            buttonType="button"
            styleType="outline"
            size="md"
            onClick={() => onToggleViewReviewCard(false)}
            icon={<RiCloseLine />}
            className="card__close"
          />
          <div>
            <label>Rating</label>
            <div className="card__rating">
              {new Array(5).fill(1).map((el, index) => (
                <Button
                  key={index}
                  buttonType="button"
                  styleType="icon"
                  size="md"
                  onClick={() => setValue("rating", index)}
                  icon={
                    index <= watchedReview.rating ? (
                      <RiStarFill key={index} />
                    ) : (
                      <RiStarLine key={index} />
                    )
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <InputField
              type="text"
              label="Review"
              props={{
                ...register("review", {
                  required: "This field is required",
                }),
                placeholder: "What do you think about this room?",
              }}
              error={errors?.review?.message}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              label="Submit review"
              buttonType="submit"
              styleType="secondary_blue"
              size="lg"
              disabled={submissionState.isSubmitting}
              isLoading={submissionState.isSubmitting}
            />
          </div>
        </AddReviewCardStyle>
      )}
    </>
  );
};

export default RoomCard;

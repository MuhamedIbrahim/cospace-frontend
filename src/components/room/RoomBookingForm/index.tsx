import { useCallback, useMemo, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCalendarLine,
  RiMoneyDollarCircleLine,
  RiTimerLine,
} from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../store/userSlice";
import { Room } from "../../../utils/Types";
import Button from "../../ui/Button";
import InputSelect from "../../ui/inputs/InputSelect";
import { formatTiming } from "../RoomCalendar";
import * as dateFns from "date-fns";
import RoomBookingFormStyle from "./style";
import appAxios from "../../../utils/appAxios";
import useSubmissionState from "../../../utils/hooks/useSubmissionState";
import { toast } from "react-toastify";

const RoomBookingForm = ({
  room,
  setBackToCalendar,
  bookingDate,
  bookingFromTiming,
  currentDayTimings,
}: {
  room: Room;
  setBackToCalendar: () => void;
  bookingDate: Date;
  bookingFromTiming: number;
  currentDayTimings: { timing: number; on: boolean }[];
}) => {
  const { user } = useSelector(selectUser);
  const navigate = useNavigate();

  const { submissionState, setSubmissionState } = useSubmissionState();

  const firstToAvailableTimingIndex = useMemo(() => {
    return currentDayTimings.findIndex(
      (el) => el.timing > bookingFromTiming && !el.on
    );
  }, [bookingFromTiming, currentDayTimings]);

  const [bookingDetails, setBookingDetails] = useState<{ to: string }>({
    to: (
      (firstToAvailableTimingIndex === -1
        ? currentDayTimings.find((el) => el.timing > bookingFromTiming)?.timing
        : currentDayTimings[firstToAvailableTimingIndex]?.timing) ||
      bookingFromTiming
    ).toString(),
  });

  const onProceedToCheckoutHandler = useCallback(async () => {
    if (user) {
      setSubmissionState({
        isSubmitting: true,
        successfulSubmission: false,
        errorSubmission: "",
      });
      let success = false,
        error = "";
      await appAxios
        .post(`/booking/checkout-session/${room._id}`, {
          from: bookingFromTiming,
          to: +bookingDetails.to,
          day: dateFns.format(bookingDate, "yyyy-MM-dd"),
        })
        .then((res) => {
          window.location.href = res.data.data.session.url;
          success = true;
        })
        .catch((err) => {
          error = err?.response?.message || "Error occured. Please try again";
          toast.error(error);
        });
      if (error)
        setSubmissionState({
          isSubmitting: false,
          successfulSubmission: success,
          errorSubmission: error,
        });
    } else {
      navigate(`/login?ref=rooms_${room.slug}`);
    }
  }, [
    user,
    navigate,
    room,
    bookingDate,
    bookingFromTiming,
    bookingDetails.to,
    setSubmissionState,
  ]);

  return (
    <RoomBookingFormStyle>
      <div className="form_top_body">
        <div className="form_header">
          <Button
            buttonType="button"
            size="md"
            styleType="secondary"
            fullRadius={true}
            onClick={setBackToCalendar}
            icon={<RiArrowLeftLine />}
          />
          <p>Booking details</p>
        </div>
        <div className="form_section">
          <p className="form_section__text">
            <i>
              <RiCalendarLine />
            </i>
            {dateFns.format(bookingDate, "PPPP")}
          </p>
        </div>
        <div className="form_section">
          <div className="form_section__row">
            <div className="form_section__col" style={{ width: "50%" }}>
              <span className="form_section__label">From</span>
              <p className="form_section__text">
                <i>
                  <RiTimerLine />
                </i>
                {formatTiming(bookingFromTiming)}
              </p>
            </div>
            <div className="form_section__col" style={{ width: "50%" }}>
              <InputSelect
                label="To"
                options={[
                  {
                    options: currentDayTimings
                      .filter(({ timing }, index) =>
                        firstToAvailableTimingIndex === -1
                          ? timing > bookingFromTiming
                          : timing > bookingFromTiming &&
                            index <= firstToAvailableTimingIndex
                      )
                      .map(({ timing }) => ({
                        label: formatTiming(timing),
                        value: timing.toString(),
                      })),
                  },
                ]}
                props={{
                  value: bookingDetails.to,
                  onChange: (e) => setBookingDetails({ to: e.target.value }),
                }}
              />
            </div>
          </div>
        </div>
        <div className="form_section">
          <div className="form_section__row">
            <div className="form_section__col" style={{ width: "50%" }}>
              <span className="form_section__label">Price per hour</span>
              <p className="form_section__text">
                <i>
                  <RiMoneyDollarCircleLine />
                </i>
                {room.pricePerHour}
              </p>
            </div>
            <div className="form_section__col" style={{ width: "50%" }}>
              <span className="form_section__label">Total hours</span>
              <p className="form_section__text">
                <i>
                  <RiTimerLine />
                </i>
                {+bookingDetails.to - bookingFromTiming}{" "}
                {+bookingDetails.to - bookingFromTiming > 1 ? "hours" : "hour"}
              </p>
            </div>
            <div className="form_section__col" style={{ width: "50%" }}>
              <span className="form_section__label">Total price</span>
              <p className="form_section__text">
                <i>
                  <RiMoneyDollarCircleLine />
                </i>
                {room.pricePerHour * (+bookingDetails.to - bookingFromTiming)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="form_bottom_body">
        <Button
          size="xl"
          buttonType="button"
          styleType="secondary"
          onClick={setBackToCalendar}
          label="Go back"
          disabled={submissionState.isSubmitting}
        />
        <Button
          size="xl"
          buttonType="button"
          styleType="primary"
          onClick={onProceedToCheckoutHandler}
          label="Checkout"
          iconPosition="start"
          icon={<RiArrowRightLine />}
          disabled={submissionState.isSubmitting}
          isLoading={submissionState.isSubmitting}
        />
      </div>
    </RoomBookingFormStyle>
  );
};

export default RoomBookingForm;

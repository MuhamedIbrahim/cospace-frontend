import { useCallback, useEffect, useMemo, useState } from "react";
import RoomCalendarStyle from "./style";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import * as dateFns from "date-fns";
import { Booking, Days, Room, RoomAvailability } from "../../../utils/Types";
import LoadingSpinnerContainer from "../../ui/LoadingSpinner/LoadingSpinnerContainer";
import LoadingSpinner from "../../ui/LoadingSpinner";
import appAxios from "../../../utils/appAxios";
import RoomCalendarTable from "../RoomCalendarTable";
import RoomBookingForm from "../RoomBookingForm";

export const formatTiming = (timing: number) =>
  (timing <= 12 ? timing : timing - 12) + ":00" + (timing < 12 ? " AM" : " PM");

const RoomCalendar = ({
  room,
  availability,
}: {
  availability: RoomAvailability;
  room: Room;
}) => {
  const [currentDay, setCurrentDay] = useState<Date>(
    dateFns.startOfDay(new Date())
  );

  const [currentDayBookings, setCurrentDayBookings] = useState<{
    isFetching: boolean;
    bookings: Booking[];
  }>({ isFetching: false, bookings: [] });

  const [checkout, setCheckout] = useState<{
    isChecking: boolean;
    from: number;
  }>({ isChecking: false, from: 0 });

  const currentDayName = useMemo(() => {
    return dateFns.format(currentDay, "eeee").toLowerCase() as Days;
  }, [currentDay]);

  const currentDayTimings = useMemo(() => {
    return new Array(
      +availability[currentDayName].to.substring(0, 2) -
        +availability[currentDayName].from.substring(0, 2) +
        1
    )
      .fill(1)
      .map(
        (_, index) => +availability[currentDayName].from.substring(0, 2) + index
      )
      .map((timing) => ({
        on:
          currentDayBookings.bookings.findIndex(
            (el) =>
              timing >= +el.from.substring(0, 2) &&
              timing < +el.to.substring(0, 2)
          ) !== -1
            ? false
            : true,
        timing,
      }));
  }, [availability, currentDayName, currentDayBookings.bookings]);

  const onChangeDayHandler = useCallback((type: "prev" | "next") => {
    if (type === "next") {
      setCurrentDay((current) => dateFns.add(current, { days: 1 }));
    } else {
      setCurrentDay((current) =>
        dateFns.previousDay(
          current,
          (current.getDay() >= 1 ? current.getDay() - 1 : 6) as Day
        )
      );
    }
  }, []);

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    (async () => {
      setCurrentDayBookings({
        isFetching: true,
        bookings: [],
      });
      let bookings: Booking[] = [];
      await appAxios
        .post(
          `/booking/room-day-bookings/${room._id}`,
          {
            day: dateFns.format(currentDay, "yyyy-MM-dd"),
          },
          {
            signal,
          }
        )
        .then((res) => {
          bookings = res.data.data.bookings;
        })
        .catch(() => {});
      setCurrentDayBookings({
        isFetching: false,
        bookings,
      });
    })();
    return () => {
      if (fetchController) fetchController.abort();
    };
  }, [currentDay, room._id]);

  return !checkout.isChecking ? (
    <RoomCalendarStyle>
      {currentDayBookings.isFetching && (
        <LoadingSpinnerContainer cssStyle={{ opacity: 0.5 }}>
          <LoadingSpinner />
        </LoadingSpinnerContainer>
      )}
      <div className="calendar__date">
        <div className="calendar__date_day">
          <span>Booking day</span>
          <p>{dateFns.format(currentDay, "PPPP")}</p>
        </div>
        <div className="calendar__date_controllers">
          {!dateFns.isToday(currentDay) && (
            <button type="button" onClick={() => onChangeDayHandler("prev")}>
              <RiArrowLeftLine />
            </button>
          )}
          <button type="button" onClick={() => onChangeDayHandler("next")}>
            <RiArrowRightLine />
          </button>
        </div>
      </div>
      <RoomCalendarTable
        currentDayTimings={currentDayTimings}
        setCheckout={(from) => setCheckout({ isChecking: true, from })}
      />
    </RoomCalendarStyle>
  ) : (
    <RoomBookingForm
      room={room}
      setBackToCalendar={() => setCheckout({ isChecking: false, from: 0 })}
      bookingDate={currentDay}
      bookingFromTiming={checkout.from}
      currentDayTimings={currentDayTimings}
    />
  );
};

export default RoomCalendar;

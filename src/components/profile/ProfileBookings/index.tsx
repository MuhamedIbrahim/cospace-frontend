import { useEffect, useState } from "react";
import appAxios from "../../../utils/appAxios";
import { Booking, Room } from "../../../utils/Types";
import RoomCard from "../../room/RoomCard";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ProfileBookingsStyle from "./style";
import * as dateFns from "date-fns";

const ProfileBookings = () => {
  const [pageState, setPageState] = useState<{
    isFetching: boolean;
    bookings: Booking[];
  }>({ isFetching: true, bookings: [] });

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    (async () => {
      let bookings: Booking[] = [];
      await appAxios
        .get("/booking/my-bookings", { signal })
        .then((res) => {
          bookings = res.data.data.bookings;
        })
        .catch((err) => {});
      setPageState({
        isFetching: false,
        bookings,
      });
    })();
    return () => {
      if (fetchController) fetchController.abort();
    };
  }, []);

  return (
    <ProfileBookingsStyle>
      <h1 className="profile__section_title">My bookings</h1>
      <div className="profile__sub_section">
        {pageState.isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="bookings__rooms">
            {pageState.bookings.map(({ room, isReviewed, day, to }) => (
              <RoomCard
                key={(room as Room)._id}
                room={room as Room}
                roomTag={
                  dateFns.format(new Date(day), "yyyy-MM-dd") >
                  dateFns.format(new Date(), "yyyy-MM-dd")
                    ? "Scheduled"
                    : ""
                }
                hideReviews={true}
                askToAddReview={
                  !isReviewed &&
                  (dateFns.format(new Date(day), "yyyy-MM-dd") <
                  dateFns.format(new Date(), "yyyy-MM-dd")
                    ? true
                    : dateFns.format(new Date(day), "yyyy-MM-dd") ===
                      dateFns.format(new Date(), "yyyy-MM-dd")
                    ? dateFns.format(new Date(), "HH:mm") > to
                    : false)
                }
              />
            ))}
            {pageState.bookings.length === 0 && (
              <p className="no_bookings">
                You don't have bookings at the current time.
              </p>
            )}
          </div>
        )}
      </div>
    </ProfileBookingsStyle>
  );
};

export default ProfileBookings;

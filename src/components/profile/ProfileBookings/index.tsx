import { useEffect, useState } from "react";
import appAxios from "../../../utils/appAxios";
import { Booking, Room } from "../../../utils/Types";
import RoomCard from "../../room/RoomCard";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ProfileBookingsStyle from "./style";

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
          <>
            {pageState.bookings.map(({ room }) => (
              <RoomCard key={(room as Room)._id} room={room as Room} />
            ))}
            {pageState.bookings.length === 0 && (
              <p className="no_bookings">
                You don't have bookings at the current time.
              </p>
            )}
          </>
        )}
      </div>
    </ProfileBookingsStyle>
  );
};

export default ProfileBookings;

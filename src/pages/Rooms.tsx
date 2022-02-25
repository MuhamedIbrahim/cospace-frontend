import { useEffect, useState } from "react";
import {
  ContentWrapper,
  OriginalWrapper,
} from "../components/containers/containers";
import RoomCard from "../components/room/RoomCard";
import Header from "../components/ui/Header";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingSpinnerContainer from "../components/ui/LoadingSpinner/LoadingSpinnerContainer";
import appAxios from "../utils/appAxios";
import { Room } from "../utils/Types";

const Rooms = () => {
  const [pageState, setPageState] = useState<{
    isFetching: boolean;
    rooms: Room[];
  }>({ isFetching: true, rooms: [] });

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    (async () => {
      let rooms: Room[] = [];
      await appAxios
        .get("/room?sort=rating,-ratingsQuantity", { signal })
        .then((res) => {
          rooms = res.data.data.rooms;
        })
        .catch((err) => {});
      setPageState({
        isFetching: false,
        rooms,
      });
    })();
    return () => {
      if (fetchController) fetchController.abort();
    };
  }, []);

  return (
    <>
      <Header />
      <ContentWrapper>
        {pageState.isFetching ? (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        ) : (
          <OriginalWrapper
            style={{ paddingBottom: "60px", paddingTop: "30px" }}
          >
            {pageState.rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </OriginalWrapper>
        )}
      </ContentWrapper>
    </>
  );
};

export default Rooms;

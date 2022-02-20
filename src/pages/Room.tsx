import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ContentWrapper,
  ContentWrapperSplitted,
} from "../components/containers/containers";
import RoomCalendar from "../components/room/RoomCalendar";
import RoomProfile from "../components/room/RoomProfile";
import Header from "../components/ui/Header";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingSpinnerContainer from "../components/ui/LoadingSpinner/LoadingSpinnerContainer";
import appAxios from "../utils/appAxios";
import { Room as RoomType } from "../utils/Types";

const Room = () => {
  const { roomSlug } = useParams();

  const [pageState, setPageState] = useState<{
    isFetching: boolean;
    room: RoomType | null;
  }>({ isFetching: true, room: null });

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    (async () => {
      let room: RoomType | null = null;
      await appAxios
        .get(`/room/${roomSlug}?as=slug&with=reviews,reviews.user`, { signal })
        .then((res) => {
          room = res.data.data.room;
        })
        .catch((err) => {});
      setPageState({
        isFetching: false,
        room,
      });
    })();
    return () => {
      if (fetchController) fetchController.abort();
    };
  }, [roomSlug]);

  return (
    <>
      <Header headerStyle="blue" />
      <ContentWrapper>
        {(!isMapLoaded || pageState.isFetching) && (
          <LoadingSpinnerContainer cssStyle={{ zIndex: "20" }}>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        )}
        {!pageState.isFetching && pageState.room && (
          <>
            <ContentWrapperSplitted
              width="60%"
              style={{ backgroundColor: "#F6F9FE" }}
            >
              <RoomProfile
                room={pageState.room}
                setIsMapLoaded={setIsMapLoaded}
              />
            </ContentWrapperSplitted>
            <ContentWrapperSplitted width="40%">
              <RoomCalendar
                room={pageState.room}
                availability={pageState.room.availability}
              />
            </ContentWrapperSplitted>
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default Room;

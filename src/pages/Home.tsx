import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ContentWrapper,
  ContentWrapperSplitted,
} from "../components/containers/containers";
import HomeHero from "../components/home/HomeHero";
import SingleRoomMap from "../components/maps/SingleRoomMap";
import Header from "../components/ui/Header";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import LoadingSpinnerContainer from "../components/ui/LoadingSpinner/LoadingSpinnerContainer";
import appAxios from "../utils/appAxios";
import { Room } from "../utils/Types";

const Home = () => {
  const isOnMobile = useMemo(() => window.innerWidth < 992, []);

  const [pageState, setPageState] = useState<{
    isFetching: boolean;
    rooms: Room[];
  }>({ isFetching: true, rooms: [] });

  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(
    isOnMobile ? true : false
  );

  const [activeRoomIndex, setActiveRoomIndex] = useState<number>(0);

  useEffect(() => {
    const fetchController = new AbortController();
    const signal = fetchController.signal;
    (async () => {
      let rooms: Room[] = [];
      await appAxios
        .get("/room?limit=3&sort=rating,ratingsQuantity", { signal })
        .then((res) => {
          rooms = res.data.data.rooms.map((room: any) => {
            const coordinates = [...room.location.coordinates];
            coordinates.reverse();
            return {
              ...room,
              location: { ...room.location, coordinates: coordinates },
            };
          });
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

  const setActiveRoomIndexHandler = useCallback(
    (type: "next" | "prev") => {
      setActiveRoomIndex((currentIndex) =>
        type === "next"
          ? currentIndex + 1 < pageState.rooms.length
            ? currentIndex + 1
            : 0
          : currentIndex - 1 >= 0
          ? currentIndex - 1
          : pageState.rooms.length - 1
      );
    },
    [pageState.rooms]
  );

  return (
    <>
      <Header />
      <ContentWrapper>
        {(!isMapLoaded || pageState.isFetching) && (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        )}
        {!pageState.isFetching && (
          <>
            <ContentWrapperSplitted width="60%" style={{ height: "100%" }}>
              {isMapLoaded && (
                <HomeHero
                  rooms={pageState.rooms}
                  setActiveRoomIndex={setActiveRoomIndexHandler}
                  activeRoomIndex={activeRoomIndex}
                />
              )}
            </ContentWrapperSplitted>
            {!isOnMobile && (
              <ContentWrapperSplitted
                width="40%"
                custom={(theme) => `${theme.breakpoints.lgDown}{display: none}`}
              >
                <SingleRoomMap
                  locations={pageState.rooms.map(
                    (el) => el.location.coordinates
                  )}
                  setIsMapLoaded={setIsMapLoaded}
                  activeRoomIndex={activeRoomIndex}
                />
              </ContentWrapperSplitted>
            )}
          </>
        )}
      </ContentWrapper>
    </>
  );
};

export default Home;

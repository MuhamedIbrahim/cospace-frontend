import { useMemo } from "react";
import { Location } from "../../../../utils/Types";
import SingleRoomMap from "../../../maps/SingleRoomMap";
import RoomLocationStyle from "./style";

const RoomLocation = ({
  location,
  title,
  setIsMapLoaded,
}: {
  location: Location;
  title: string;
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const coordinates = useMemo(() => {
    const coordinates: [number, number] = [...location.coordinates];
    coordinates.reverse();
    return coordinates;
  }, [location]);

  return (
    <RoomLocationStyle>
      <h2 className="room_section__title">Location</h2>
      <p className="room_section__subtitle">{title}</p>
      <div className="room_location">
        <SingleRoomMap
          locations={[coordinates]}
          setIsMapLoaded={setIsMapLoaded}
          activeRoomIndex={0}
        />
      </div>
    </RoomLocationStyle>
  );
};

export default RoomLocation;

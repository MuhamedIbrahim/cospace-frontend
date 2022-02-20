import { Room } from "../../../utils/Types";
import RoomAmmenities from "./RoomAmmenities";
import RoomHero from "./RoomHero";
import RoomLocation from "./RoomLocation";
import RoomReviews from "./RoomReviews";
import RoomProfileStyle from "./style";

const RoomProfile = ({
  room,
  setIsMapLoaded,
}: {
  room: Room;
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <RoomProfileStyle>
      <RoomHero name={room.name} image={room.image} />
      <RoomAmmenities ammenities={room.ammenities} />
      <RoomLocation
        location={room.location}
        title={room.title}
        setIsMapLoaded={setIsMapLoaded}
      />
      <RoomReviews reviews={room.reviews} />
    </RoomProfileStyle>
  );
};

export default RoomProfile;

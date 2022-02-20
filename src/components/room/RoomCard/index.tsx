import { RiStarFill, RiStarLine } from "react-icons/ri";
import { roomsImagesBaseURL } from "../../../utils/env";
import { Room } from "../../../utils/Types";
import RoomCardStyle from "./style";

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <RoomCardStyle to={`/rooms/${room.slug}`}>
      <div className="card_image">
        <span className="card_image__tag">Available</span>
        <img src={`${roomsImagesBaseURL}/${room.image}`} alt="" />
      </div>
      <div className="card_info">
        <h2>{room.name}</h2>
        <p className="card_info__address">{room.title}</p>
        <div className="card_info__rating">
          {new Array(5)
            .fill(1)
            .map((_, index) => (index < room.rating ? 1 : 0))
            .map((el, index) =>
              el === 1 ? <RiStarFill key={index} /> : <RiStarLine key={index} />
            )}
        </div>
        <p className="card_info__ammenities">
          {room.ammenities
            .filter((_: string, index: number) => index < 3)
            .map((el: string, index: number) => (
              <span key={index}>{el}</span>
            ))}
        </p>
      </div>
    </RoomCardStyle>
  );
};

export default RoomCard;

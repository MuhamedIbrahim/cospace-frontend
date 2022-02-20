import { roomsImagesBaseURL } from "../../../../utils/env";
import RoomHeroStyle from "./style";

const RoomHero = ({ name, image }: { name: string; image: string }) => {
  return (
    <RoomHeroStyle>
      <h1>{name}</h1>
      <img src={`${roomsImagesBaseURL}/${image}`} alt="" />
    </RoomHeroStyle>
  );
};

export default RoomHero;

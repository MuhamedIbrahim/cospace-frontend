import HomeHeroStyle from "./style";
import { Link } from "react-router-dom";
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import { useCallback, useEffect, useRef } from "react";
import { roomsImagesBaseURL } from "../../../utils/env";
import { Room } from "../../../utils/Types";

const HomeHero = ({
  rooms,
  setActiveRoomIndex,
  activeRoomIndex,
}: ComponentProps) => {
  const autoChangeInterval = useRef<any>(null);

  useEffect(() => {
    autoChangeInterval.current = setInterval(() => {
      setActiveRoomIndex("next");
    }, 10000);
    return () => {
      if (autoChangeInterval.current) clearInterval(autoChangeInterval.current);
    };
  }, [setActiveRoomIndex]);

  const onClickControllerHandler = useCallback(
    (type) => {
      setActiveRoomIndex(type);
      if (autoChangeInterval.current) clearInterval(autoChangeInterval.current);
      autoChangeInterval.current = setInterval(() => {
        setActiveRoomIndex("next");
      }, 10000);
    },
    [setActiveRoomIndex]
  );

  return (
    <HomeHeroStyle>
      <div className="hero__slider">
        {rooms.map((room, index) => (
          <div
            key={room._id}
            className={`hero__slider_single`}
            style={{
              transform: `translateX(${(index - activeRoomIndex) * 100 + "%"})`,
            }}
          >
            <div className="hero__image">
              <img src={`${roomsImagesBaseURL}/${room.image}`} alt="" />
            </div>
            <div className="hero__info">
              <p>{room.title}</p>
              <h1>
                <Link to={`/rooms/${room.slug}`}>{room.name}</Link>
              </h1>
              <span>Up to {room.maxSize} people.</span>
            </div>
          </div>
        ))}
      </div>
      <div className="hero__controller">
        <button type="button" onClick={() => onClickControllerHandler("prev")}>
          <RiArrowLeftLine />
        </button>
        <button type="button" onClick={() => onClickControllerHandler("next")}>
          <RiArrowRightLine />
        </button>
      </div>
    </HomeHeroStyle>
  );
};

export default HomeHero;

type ComponentProps = {
  rooms: Room[];
  setActiveRoomIndex: (type: "next" | "prev") => void;
  activeRoomIndex: number;
};

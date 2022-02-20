import RoomAmmenitiesStyle from "./style";

const RoomAmmenities = ({ ammenities }: { ammenities: string[] }) => {
  return (
    <RoomAmmenitiesStyle>
      <h2 className="room_section__title">Amenities</h2>
      <p className="room_section__subtitle">
        Updated with your health and safety in mind
      </p>
      <div className="room_ammenities">
        {ammenities.map((el, index) => (
          <div key={index} className="room_ammenities_single">
            <div className="room_ammenities_single_content">
              <span>{el}</span>
            </div>
          </div>
        ))}
      </div>
    </RoomAmmenitiesStyle>
  );
};

export default RoomAmmenities;

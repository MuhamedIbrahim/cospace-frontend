import { formatTiming } from "../RoomCalendar";
import RoomCalendarTableStyle from "./style";

const RoomCalendarTable = ({
  currentDayTimings,
  setCheckout,
}: {
  currentDayTimings: { timing: number; on: boolean }[];
  setCheckout: (from: number) => void;
}) => {
  return (
    <RoomCalendarTableStyle>
      <tbody>
        {currentDayTimings.map(({ timing, on }, index) => (
          <tr
            key={index}
            className={
              index === currentDayTimings.length - 1 ? "last_timing__row" : ""
            }
          >
            <td>
              <span>{formatTiming(timing)}</span>
            </td>
            <td
              className={on ? "on" : "off"}
              onClick={() =>
                index < currentDayTimings.length - 1 && on
                  ? setCheckout(timing)
                  : {}
              }
            >
              {index < currentDayTimings.length - 1 &&
                (on ? "Available" : "Booked")}
            </td>
          </tr>
        ))}
      </tbody>
    </RoomCalendarTableStyle>
  );
};

export default RoomCalendarTable;

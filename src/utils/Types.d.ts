export type Days =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  createdAt: string;
  user: string | User;
  room: string | Room;
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
}

export interface RoomAvailability {
  sunday: {
    from: string;
    to: string;
    on: boolean;
  };
  monday: {
    from: string;
    to: string;
    on: boolean;
  };
  tuesday: {
    from: string;
    to: string;
    on: boolean;
  };
  wednesday: {
    from: string;
    to: string;
    on: boolean;
  };
  thursday: {
    from: string;
    to: string;
    on: boolean;
  };
  friday: {
    from: string;
    to: string;
    on: boolean;
  };
  saturday: {
    from: string;
    to: string;
    on: boolean;
  };
}

export interface Room {
  _id: string;
  name: string;
  area: number;
  maxSize: number;
  pricePerHour: number;
  floor: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  rating: number;
  ratingsQuantity: number;
  location: Location;
  ammenities: string[];
  availability: RoomAvailability;
  reviews?: Review[];
}

export interface Booking {
  _id: string;
  room: string | Room;
  user: string | User;
  day: string;
  from: string;
  to: string;
  totalPrice: number;
  isReviewed: boolean;
  createdAt: string;
  updatedAt: string;
}

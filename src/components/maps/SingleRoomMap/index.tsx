import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useMemo, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import SingleRoomMapStyle from "./style";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWlicmFoaW0yNSIsImEiOiJja3pnd2pxMzcwMGdnMm9xdXhhamNuMTkyIn0.MJ8yCNUNczz_m-JaYEs_5Q";

const SingleRoomMap = ({
  locations,
  setIsMapLoaded,
  activeRoomIndex,
}: ComponentProps) => {
  const isInitialLoading = useRef<boolean>(true);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const marker = useMemo(() => {
    return new mapboxgl.Marker();
  }, []);

  useEffect(() => {
    if (mapContainer.current && !map.current && isInitialLoading) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: locations[0],
        zoom: 15,
        scrollZoom: false,
      });

      // Add markers to the map.
      marker.setLngLat(locations[0]).addTo(map.current);

      map.current.on("load", () => {
        setIsMapLoaded(true);
      });
    }
    if (map.current && !isInitialLoading.current) {
      map.current.flyTo({
        center: locations[activeRoomIndex],
        zoom: 15,
        speed: 3.5,
        curve: 1,
      });
      marker.setLngLat(locations[activeRoomIndex]).addTo(map.current);
    }
    if (map.current && isInitialLoading) {
      isInitialLoading.current = false;
    }
  }, [locations, setIsMapLoaded, activeRoomIndex, marker]);

  return <SingleRoomMapStyle ref={mapContainer}></SingleRoomMapStyle>;
};

export default SingleRoomMap;

type ComponentProps = {
  locations: [number, number][];
  setIsMapLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  activeRoomIndex: number;
};

import axios from "axios";
import { useEffect, useState } from "react";
import { useMessenger } from "./useMessenger";

const MAPS_KEY = import.meta.env.VITE_PLACES_API;

function useGeolocation() {
  const { showMessage } = useMessenger();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isAllowed, setIsAllowed] = useState(false);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setIsAllowed(true);
        },
        (error) => {
          setIsAllowed(false);
          showMessage("Error getting location", "error");
          console.error("Error getting location:", error);
        }
      );
    } else {
      setIsAllowed(false);
      showMessage("Geolocation is not supported by this browser.", "error");
    }
  }, []);

  useEffect(() => {
    const getAddressFromCoordinates = async (lat: number, lng: number) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`
        );

        if (response.data.status === "OK") {
          const addressComponents = response.data.results[0].address_components;

          // Find the city from the address components
          const cityComponent = addressComponents.find((component: any) =>
            component.types.includes("locality")
          );

          if (cityComponent) {
            setAddress(cityComponent.long_name); // City name
          } else {
            console.error("City not found in address components.");
          }
        } else {
          console.error("Error: ", response.data.status);
        }
      } catch (error) {
        console.error("Geocoding API Error: ", error);
      }
    };

    if (location) {
      getAddressFromCoordinates(location.latitude, location.longitude);
    }
  }, [location]);

  return { location, address, isAllowed };
}

export default useGeolocation;

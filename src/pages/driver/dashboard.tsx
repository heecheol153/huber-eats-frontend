import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

export const Dashboard = () => {
  const [driverCoords, setDriveCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  // @ts-ignore
  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setDriveCoords({ lat: latitude, lng: longitude });
    //console.log(position);
  };
  // @ts-ignore
  const onError = (error: GeolocationPositionError) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new maps.LatLng(driverCoords.lat, driverCoords.lng));
  };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={15}
          draggable={true}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDwu5TwKK2NE-TboTH693zFRrG37BB4Mu8" }}
        ></GoogleMapReact>
      </div>
    </div>
  );
};

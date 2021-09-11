import React from "react";
import GoogleMapReact from "google-map-react";
import { useEffect, useState } from "react";
import googleMapReact from "google-map-react";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚗</div>;

export const Dashboard = () => {
  const [driverCoords, setDriveCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
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
  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      /* const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        {
          location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
        },
        (results, status) => {
          console.log(status, results);
        }
      ); */
    }
  }, [map, maps, driverCoords.lat, driverCoords.lng]);
  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
    setMap(map);
    setMaps(maps);
  };
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultZoom={16}
          draggable={false}
          defaultCenter={{
            lat: 36.58,
            lng: 125.95,
          }}
          bootstrapURLKeys={{ key: "AIzaSyDwu5TwKK2NE-TboTH693zFRrG37BB4Mu8" }}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

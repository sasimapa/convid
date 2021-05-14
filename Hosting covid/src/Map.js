import React from "react";
import "./Map.css";
import {
  MapContainer as LeafleMap,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function Map(props) {
  const position = [51.505, -0.09];

  return (
    <div className="map">
      {/* <h1>I am a msdsap</h1> */}
      <LeafleMap center={props.center} zoom={props.zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{position}</Popup>
        </Marker>
      </LeafleMap>
    </div>
  );
}

export default Map;

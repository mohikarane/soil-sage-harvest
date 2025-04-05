"use client"; // Required for Next.js App Router

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon, LatLngExpression } from "leaflet";

// Firestore imports
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// / Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAchCcYj7igcwTvukJe8kjbpZ4FlS_o-oQ",
//   authDomain: "landfertility.firebaseapp.com",
//   projectId: "landfertility",
//   storageBucket: "landfertility.firebasestorage.app",
//   messagingSenderId: "841863292349",
//   appId: "1:841863292349:web:0ed4cf1c494b02da6a5ed4",
//   measurementId: "G-4ET2PMD8VT"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// Firebase Config 
const firebaseConfig = {
    apiKey: "AIzaSyAchCcYj7igcwTvukJe8kjbpZ4FlS_o-oQ",
    authDomain: "landfertility.firebaseapp.com",
    projectId: "landfertility",
    storageBucket: "landfertility.firebasestorage.app",
    messagingSenderId: "841863292349",
    appId: "1:841863292349:web:0ed4cf1c494b02da6a5ed4",
    measurementId: "G-4ET2PMD8VT"
  };


// Initialize Firebase only once (Fixes re-initialization issue in Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define TypeScript Interface for Firestore Data
interface FertilityData {
  Latitude: number;
  Longitude: number;
  District: string;
  Fertility_Class: string;
  N: number;
  P: number;
  K: number;
  Mean_NDVI: number;
  ANNUALRAIN: number;
}

// Custom marker icons based on Fertility Class
const getMarkerIcon = (fertilityClass: string): L.Icon<L.IconOptions> => {
  const color = fertilityClass === "High" ? "green" : fertilityClass === "Medium" ? "orange" : "red";
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconRetinaUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}-2x.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const FertilityMap: React.FC = () => {
  const [locations, setLocations] = useState<FertilityData[]>([]);
  const [loading, setLoading] = useState(true);

  // Default center coordinates (India)
  const mapCenter: LatLngExpression = [20.5937, 78.9629];

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "fertility_data"));
        const data = querySnapshot.docs.map((doc) => doc.data() as FertilityData);
        setLocations(data);
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-[500px] relative">
      {loading && <p className="text-center">Loading map data...</p>}
      <MapContainer center={mapCenter as LatLngExpression} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location, index) => {
          const position: LatLngExpression = [location.Latitude, location.Longitude];
          return (
            <Marker key={index} position={position} icon={getMarkerIcon(location.Fertility_Class)}>
              <Popup>
                <strong>District:</strong> {location.District} <br />
                <strong>Fertility Class:</strong> {location.Fertility_Class} <br />
                <strong>N:</strong> {location.N}, <strong>P:</strong> {location.P}, <strong>K:</strong> {location.K} <br />
                <strong>Rainfall:</strong> {location.ANNUALRAIN} mm <br />
                <strong>NDVI:</strong> {location.Mean_NDVI}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default FertilityMap;

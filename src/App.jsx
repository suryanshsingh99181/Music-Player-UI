import React, { useContext } from "react";
import Player from "./components/Player/Player";
import { TrackContext } from "./context/TrackContext";
import "./App.css";
import ToggleInSideBar from "./components/ToggleInSideBar";
import { ImSpotify } from "react-icons/im";
import profile from "./assets/suryansh.jpg";

const App = () => {
  const { currentTrack } = useContext(TrackContext);
  console.log(
    "Current track cover:",
    currentTrack ? currentTrack.cover : "No track"
  );

  const backgroundStyle = currentTrack
    ? {
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
          url(https://cms.samespace.com/assets/${currentTrack.cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Make sure it covers the full viewport height
      }
    : {
        background: `linear-gradient(rgba(176, 137, 60, 0.7), rgba(0, 0, 0, 0.7))`, // Fallback gradient
        height: "100vh",
      };
  return (
    <div className="app-container flex relative" style={backgroundStyle}>
      <span className="text-white flex text-3xl m-4">
        <ImSpotify />
        Spotify
      </span>
      <span className=" absolute left-0 bottom-0 text-white m-8">
        <img
          src={profile}
          alt="Profile"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </span>

      <ToggleInSideBar />

      <Player />
    </div>
  );
};

export default App;

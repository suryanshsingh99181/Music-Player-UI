import React, { useState } from "react";
import Sidebar from "./components/SideBar/SideBar";
import Player from "./components/Player/Player";
import TrackInfo from "./components/TrackInfo";
import "./App.css";
import SideBarTopTrack from "./components/SideBarTopTrack";

const App = () => {
  const [topTrackSelected, setTopTrackSelected] = useState(false);

  return (
    <div className="flex mt-5 justify-evenly">
      <div className="app-container">
        <button
          onClick={() => setTopTrackSelected(false)}
          className={topTrackSelected ? "" : "active"}
        >
          For You
        </button>
        <button
          onClick={() => setTopTrackSelected(true)}
          className={topTrackSelected ? "active" : ""}
        >
          Top Track
        </button>
        <div>{topTrackSelected ? <SideBarTopTrack /> : <Sidebar />}</div>
      </div>
      <div>
        <Player />
      </div>
    </div>
  );
};

export default App;

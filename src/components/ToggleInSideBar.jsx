import { useState } from "react";
import SideBarTopTrack from "./SideBarTopTrack";
import Sidebar from "./SideBar/SideBar";

const ToggleInSideBar = () => {
  const [topTrackSelected, setTopTrackSelected] = useState(false);
  return (
    <div className="flex flex-col left-1 w-[320px] mx-20 p-10">
      {/* Toggle between For You and Top Track*/}
      <span className="flex justify-evenly mx-5 mb-2">
        <button
          onClick={() => setTopTrackSelected(false)}
          className={`text-white${topTrackSelected ? "" : " font-extrabold"}`}
        >
          For You
        </button>
        <button
          onClick={() => setTopTrackSelected(true)}
          className={`text-white ${topTrackSelected ? "font-extrabold" : ""}`}
        >
          Top Track
        </button>
      </span>
      <div>{topTrackSelected ? <SideBarTopTrack /> : <Sidebar />}</div>
    </div>
  );
};

export default ToggleInSideBar;

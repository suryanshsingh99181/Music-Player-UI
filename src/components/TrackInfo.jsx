import React from "react";

const TrackInfo = ({ currentTrack }) => {
  return (
    <div className="track-info">
      <h1>{currentTrack.title}</h1>
      <h2>{currentTrack.artist}</h2>
    </div>
  );
};

export default TrackInfo;

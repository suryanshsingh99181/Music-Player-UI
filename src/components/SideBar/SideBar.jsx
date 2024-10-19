import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { TrackContext } from "../../context/TrackContext";
import "./SideBar.css";

const Sidebar = () => {
  const { songsList, currentTrack, handleSongSelect } =
    useContext(TrackContext);
  const [searchSong, setSearchSong] = useState("");
  // const [songSelected, setSongSelected] = useState(false);

  const handleSearch = (event) => {
    // console.log(event.target.value);

    setSearchSong(event.target.value);
  };

  const filteredSongs = songsList.filter(
    (song) =>
      song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchSong.toLowerCase())
  );
  // const handleOnClick = () => {
  //   console.log("Clicked");
  //   className={"bg-deep-orange-800"};
  // };

  return (
    <>
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchSong}
        className="search-bar border border-black"
        onChange={handleSearch}
      />
      <ul className="track-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => {
            const isCurrentTrack = currentTrack && currentTrack.id === song.id;
            return (
              <li
                className={`flex${isCurrentTrack ? "highlight" : ""}`}
                key={song.id}
                onClick={() => {
                  // console.log("Selected song:", song);
                  handleSongSelect(song);
                }}
              >
                <img
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  className="w-8 h-8 rounded-full"
                />
                <span className="flex flex-col">
                  <span>{song.name}</span>
                  <span className=" text-xs">{song.artist}</span>
                </span>
              </li>
            );
          })
        ) : (
          <p>No Such Song Found</p>
        )}
      </ul>
    </>
  );
};

export default Sidebar;

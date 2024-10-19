import React, { useContext } from "react";
import { useState } from "react";
import { TrackContext } from "../../context/TrackContext";

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
        className="search-bar border border-black rounded-sm w-full p-1 my-1 "
        onChange={handleSearch}
      />
      <ul className="track-list">
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => {
            const isCurrentTrack = currentTrack && currentTrack.id === song.id;
            return (
              <li
                className={`flex hover:bg-blue-gray-300 text-white p-1${
                  isCurrentTrack ? " font-bold text-xl" : ""
                }`}
                key={song.id}
                onClick={() => {
                  // console.log("Selected song:", song);
                  handleSongSelect(song);
                }}
              >
                <img
                  src={`https://cms.samespace.com/assets/${song.cover}`}
                  className="w-8 h-8 rounded-full mx-1"
                />
                <span className="flex flex-col">
                  <span className="mx-1">{song.name}</span>
                  <span className=" mx-1 text-xs">{song.artist}</span>
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

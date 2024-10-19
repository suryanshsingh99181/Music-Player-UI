import { TrackContext } from "../context/TrackContext";
import { useContext, useState } from "react";
const SideBarTopTrack = () => {
  const { songsList } = useContext(TrackContext);
  const [searchSong, setSearchSong] = useState("");

  //   console.log(songsList);

  const topTrack = songsList.filter((song) => {
    return song.top_track === true;
  });
  //   console.log(topTrack);
  const handleSearch = (event) => {
    // console.log(event.target.value);

    setSearchSong(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchSong}
        className="search-bar border border-black"
        onChange={handleSearch}
      />
      {topTrack.length === 0 ? (
        <p>No track available</p>
      ) : (
        <ul className="top-track-list">
          {topTrack.map((song, index) => (
            <li key={index} className="flex">
              <img
                src={`https://cms.samespace.com/assets/${song.cover}`}
                className="w-8 h-8 rounded-full"
              />
              <span className="flex flex-col">
                <span>{song.name}</span>
                <span className=" text-xs">{song.artist}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SideBarTopTrack;

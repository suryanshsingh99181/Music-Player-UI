import { TrackContext } from "../context/TrackContext";
import { useContext, useState } from "react";

const SideBarTopTrack = () => {
  const { songsList, currentTrack } = useContext(TrackContext);
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

  const filteredSongs = topTrack.filter(
    (song) =>
      song.name.toLowerCase().includes(searchSong.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchSong.toLowerCase())
  );

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

export default SideBarTopTrack;

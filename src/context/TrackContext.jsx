import { createContext, useState, useEffect } from "react";

export const TrackContext = createContext(); //creating the context

export const TrackProvider = ({ children }) => {
  const [songsList, setSongsList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("https://cms.samespace.com/items/songs");
        const data = await res.json();
        // console.log(data);
        setSongsList(data.data);
        const lastPlayedSong = localStorage.getItem("lastPlayedSong");
        if (lastPlayedSong) {
          setCurrentTrack(JSON.parse(lastPlayedSong)); // Set the last played song
        }
      } catch (error) {
        console.log("Encountered an error", error);
      }
    };
    fetchSongs();
  }, []);

  const handleSongSelect = (song) => {
    // console.log("Selected Song In Context:", song);

    setCurrentTrack(song);
    localStorage.setItem("lastPlayedSong", JSON.stringify(song));
  };

  const handleNextButton = () => {
    // Check if the current track exists and find the next track based on its ID
    if (currentTrack) {
      const nextTrackId = currentTrack.id + 1;
      const nextTrack = songsList.find((song) => song.id === nextTrackId);

      // If the next track exists, select it. Otherwise, go back to the first track.
      if (nextTrack) {
        handleSongSelect(nextTrack);
      } else {
        handleSongSelect(songsList[0]); // Loop back to the first song if no next track
      }
    }
  };

  const handlePrevButton = () => {
    // Check if the current track exists and find the next track based on its ID
    if (currentTrack) {
      const prevTrackId = currentTrack.id - 1;
      const prevTrack = songsList.find((song) => song.id === prevTrackId);

      // If the next track exists, select it. Otherwise, go back to the first track.
      if (prevTrack) {
        handleSongSelect(prevTrack);
      } else {
        handleSongSelect(songsList[songsList.length - 1]); // Loop back to the first song if no next track
      }
    }
  };

  return (
    <TrackContext.Provider
      value={{
        songsList,
        currentTrack,
        handleSongSelect,
        handleNextButton,
        handlePrevButton,
      }}
    >
      {children}
    </TrackContext.Provider>
  );
};

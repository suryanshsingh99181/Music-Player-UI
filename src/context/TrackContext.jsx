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

  return (
    <TrackContext.Provider
      value={{ songsList, currentTrack, handleSongSelect }}
    >
      {children}
    </TrackContext.Provider>
  );
};

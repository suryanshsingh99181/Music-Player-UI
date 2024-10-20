import React, { useState, useRef, useEffect, useContext } from "react";
import { TrackContext } from "../../context/TrackContext";
import "./Player.css";
import { IoPlayCircle, IoPauseCircleSharp } from "react-icons/io5";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

const Player = () => {
  const {
    songsList,
    currentTrack,
    handleSongSelect,
    handleNextButton,
    handlePrevButton,
  } = useContext(TrackContext);
  // console.log(currentTrack);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Playback error:", error); // Log any playback error
      }); // Play the audio
    }
    setIsPlaying(!isPlaying); // Toggle playing state
  };

  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime; // Update the audio current time
    setCurrentTime(newTime); // Update the current time state
  };

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      // console.log("Now playing:", currentTrack);
      if (currentTrack.url) {
        // console.log("Audio Source:", currentTrack.audioSrc); // Check the audio source
        audioRef.current.src = currentTrack.url; // Set the new track source
        audioRef.current.play().catch((error) => {
          console.error("Playback error:", error); // Log any playback error
        });
        setIsPlaying(true); // Set playing state to true
      } else {
        console.error("Audio source is missing for this track.");
      }

      // Event listener to update current time and duration
      const updateTime = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      };

      audioRef.current.addEventListener("timeupdate", updateTime);

      // Cleanup the event listener when component unmounts or changes
      return () => {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [currentTrack]); // Depend on currentTrack and isPlaying

  if (!currentTrack) return null;

  return (
    <div className="player-container max-w-[480px] max-h-[692.24px] top-[101px] right-[158px] mx-40 my-10 gap-4 ">
      {/* Song Information */}
      <div className="song-info ml-2 mt-2">
        <h1 className=" font-extrabold text-3xl ">
          {currentTrack ? currentTrack.name : "No song selected"}
        </h1>
        <p className="mt-0 ">
          {currentTrack ? currentTrack.artist : "Select a song to play"}
        </p>
      </div>
      <div className="player ">
        {/* Album Cover */}
        <img
          className="cover-image"
          src={
            currentTrack
              ? `https://cms.samespace.com/assets/${currentTrack.cover}`
              : "default-cover.jpg" /* Display a default cover if no song is selected */
          }
          alt={currentTrack ? `${currentTrack.name} cover` : "Default cover"}
        />
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container my-0">
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleProgressChange}
          className="progress-bar"
        />
        <div className="time-info">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Player Controls */}
      <div className="player-controls flex justify-center pb-4 gap-8 ">
        <button className="text-2xl" onClick={() => handlePrevButton()}>
          <TbPlayerTrackPrevFilled />
        </button>
        <button onClick={togglePlayPause} className="text-3xl">
          {isPlaying ? <IoPauseCircleSharp /> : <IoPlayCircle />}{" "}
          {/* Dynamic button text */}
        </button>
        <button className="text-2xl" onClick={() => handleNextButton()}>
          <TbPlayerTrackNextFilled />
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef}></audio>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default Player;

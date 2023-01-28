import React, { useEffect, useState } from "react";
import css from "./AudioControl.module.scss";
import musicIcon from "../../Images/musicIcon.svg";
import { useQuery } from "../../Utils/url";
import bgm from "../../Images/bgm.mp3";
import bgm2 from "../../Images/bgm2.mp3";
import Loader from "../Loader";

type AudioControlPropTypes = {
  loading?: boolean;
};

const bgms = [bgm, bgm2];

const AudioControl: React.FC<AudioControlPropTypes> = ({ loading = false }) => {
  const query = useQuery();
  const bgmIndex = Number(query.get("bgm") || "1");
  const bgmToPlay = bgms?.[bgmIndex - 1] || bgm;

  const [isPlaying, setIsPlaying] = useState(false);

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  if (bgmElement) {
    bgmElement.onplay = () => {
      setIsPlaying(true);
    };
    bgmElement.onplaying = () => {
      setIsPlaying(true);
    };
    bgmElement.onpause = () => {
      setIsPlaying(false);
    };
    bgmElement.onerror = () => {
      setIsPlaying(false);
    };
    bgmElement.onabort = () => {
      setIsPlaying(false);
    };
    bgmElement.onended = () => {
      setIsPlaying(false);
    };
    bgmElement.onstalled = () => {
      setIsPlaying(false);
    };
    bgmElement.onwaiting = () => {
      setIsPlaying(false);
    };
  }

  const getBgm = () => {
    return document.getElementById("backgroundMusic") as HTMLAudioElement;
  };

  const playMusicOnScroll = () => {
    if (getBgm().currentTime <= 0) {
      getBgm().play();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", playMusicOnScroll);
    return () => {
      window.removeEventListener("scroll", playMusicOnScroll);
    };
  }, []);

  return (
    <>
      <audio preload="auto" id="backgroundMusic" loop>
        <source src={bgmToPlay} type="audio/mpeg" />
      </audio>
      <div
        className={css.container}
        onClick={() => {
          if (!loading) {
            if (isPlaying) {
              bgmElement.pause();
            } else {
              bgmElement.play();
            }
          }
        }}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={`${css.line} ${isPlaying ? css.hide : ""}`}></div>
            <img src={musicIcon} alt="audioControl" />
          </>
        )}
      </div>
    </>
  );
};

export default AudioControl;

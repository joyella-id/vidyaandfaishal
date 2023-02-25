import React, { useEffect, useState } from "react";
import css from "./AudioControl.module.scss";
import musicIcon from "../../Images/musicIcon.svg";
import { useQuery } from "../../Utils/url";
import { renderDebugInfos } from "../../Utils/debug";
import bgm from "../../Images/bgm.mp3";
import bgm2 from "../../Images/bgm2.mp3";
import Loader from "../Loader";

const bgms = [bgm, bgm2];

const getBgm = () => {
  return document.getElementById("backgroundMusic") as HTMLAudioElement;
};

export const playMusic = (cb?: () => void) => {
  getBgm().play();
  if (cb) {
    cb();
  }
};

const AudioControl: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const bgmIndex = Number(query.get("bgm") || "1");
  const debugMode = !!query.get("debugmode");
  const bgmToPlay = bgms?.[bgmIndex - 1] || bgm;

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(getBgm()?.readyState !== 4);
      }, 500);
    }
  }, [loading]);

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  if (bgmElement) {
    bgmElement.onplay = () => {
      console.log("onplay");
      setIsPlaying(true);
    };
    bgmElement.onplaying = () => {
      console.log("onplay");
      setIsPlaying(true);
    };
    bgmElement.onpause = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
    bgmElement.onerror = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
    bgmElement.onabort = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
    bgmElement.onended = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
    bgmElement.onstalled = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
    bgmElement.onwaiting = () => {
      console.log("onpause");
      setIsPlaying(false);
    };
  }

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
        {renderDebugInfos(debugMode, [loading])}
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

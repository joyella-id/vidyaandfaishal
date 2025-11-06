import React, { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import QuranPage from "../../Components/QuranPage";
import BrideAndGroom from "../../Components/BrideAndGroom";
import Gallery from "../../Components/Galleryv2";
import Prayers from "../../Components/Prayers";
import { playMusic } from "../../Components/AudioControl";
import { useQuery } from "../../Utils/url";
import { renderDebugInfos } from "../../Utils/debug";
import TimeAndPlace from "../../Components/TimeAndPlace";
import AudioControl from "../../Components/AudioControl";
import { wishes } from "../../constant";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const prayers = wishes;
  const query = useQuery();
  const debugMode = !!query.get("debugmode");

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  const scrollToQuran = () => {
    const quranElement = document.getElementById("quranPage");
    if (quranElement) {
      quranElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (showFull) {
      scrollToQuran();
    }
  }, [showFull]);

  return (
    <>
      <AudioControl />
      <MobileWrapper>
        {renderDebugInfos(debugMode, [bgmElement?.readyState])}
        <FirstPage
          alreadyOpened={showFull}
          onClickCta={() => {
            playMusic();
            if (showFull) {
              scrollToQuran();
            } else {
              setShowFull(true);
            }
          }}
        />
        {showFull && (
          <>
            <QuranPage />
            <BrideAndGroom />
            <TimeAndPlace />
            <Reservation
              onCompletedCreateRecords={() => {
                const prayerElement = document.getElementById("prayerPage");
                if (prayerElement) {
                  prayerElement.scrollIntoView({ behavior: "smooth" });
                }
              }}
            />
            <Prayers prayers={prayers} />
            <Gallery />
          </>
        )}
      </MobileWrapper>
    </>
  );
};

export default Home;

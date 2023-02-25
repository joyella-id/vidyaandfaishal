import React, { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import { getRecords } from "../../Utils/airtable";
import QuranPage from "../../Components/QuranPage";
import BrideAndGroom from "../../Components/BrideAndGroom";
import Gallery from "../../Components/Galleryv2";
import Prayers from "../../Components/Prayers";
import { playMusic } from "../../Components/AudioControl";
import { useQuery } from "../../Utils/url";
import { renderDebugInfos } from "../../Utils/debug";
import TimeAndPlace from "../../Components/TimeAndPlace";
import AudioControl from "../../Components/AudioControl";
import { SinglePrayerType } from "../../Utils/types";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const [prayers, setPrayers] = useState<SinglePrayerType[]>([]);
  const query = useQuery();
  const debugMode = !!query.get("debugmode");

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  const getPrayers = () => {
    getRecords()
      .then((res) => {
        const prayersData = res?.map((r) => ({
          name: r?.fields?.Name as string,
          prayer: r?.fields?.Prayer as string,
        }));
        setPrayers(prayersData?.filter((prayer) => !!prayer?.prayer));
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getPrayers();
  }, []);

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
                getPrayers();
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

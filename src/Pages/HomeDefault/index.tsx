import React, { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import { getRecords } from "../../Utils/airtable";
import QuranPage from "../../Components/QuranPage";
import BrideAndGroom from "../../Components/BrideAndGroom";
import Gallery from "../../Components/Gallery";
import Prayers from "../../Components/Prayers";
import TimeAndPlace from "../../Components/TimeAndPlace";
import AudioControl from "../../Components/AudioControl";
import { SinglePrayerType } from "../../Utils/types";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const [prayers, setPrayers] = useState<SinglePrayerType[]>([]);

  const bgmElement = document.getElementById(
    "backgroundMusic"
  ) as HTMLAudioElement;

  const isAudioLoading = bgmElement?.readyState !== 4;

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
      <AudioControl loading={isAudioLoading} />
      <MobileWrapper>
        <FirstPage
          alreadyOpened={showFull}
          onClickCta={() => {
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

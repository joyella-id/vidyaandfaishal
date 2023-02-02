import { useEffect, useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import { getRecords } from "../../Utils/airtable";
import QuranPage from "../../Components/QuranPage";
import BrideAndGroom from "../../Components/BrideAndGroom";
import Gallery from "../../Components/Gallery";
import Prayers from "../../Components/Prayers";
import TimeAndPlace from "../../Components/TimeAndPlace";
import { AppContext } from "../../Utils/context";
import { useContext } from "react";
import AudioControl from "../../Components/AudioControl";
import BookFlipContainer from "../../Components/BookFlipContainer";
import { SinglePrayerType } from "../../Utils/types";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const [prayers, setPrayers] = useState<SinglePrayerType[]>([]);
  const contextData = useContext(AppContext);

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

  return (
    <>
      <AudioControl loading={isAudioLoading} />
      <MobileWrapper>
        <BookFlipContainer
          style={{ maxWidth: "600px", zIndex: "3" }}
          positionAbsolute={showFull}
          width="100%"
          height={`${contextData.firstRenderHeight}px`}
          show={showFull}
          backCover={<div></div>}
          frontCover={
            <FirstPage
              alreadyOpened={showFull}
              onClickCta={() => {
                setShowFull(true);
              }}
            />
          }
        />
        <div
          style={{
            height: showFull ? "unset" : "0px",
            overflow: "hidden",
          }}
        >
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
        </div>
      </MobileWrapper>
    </>
  );
};

export default Home;

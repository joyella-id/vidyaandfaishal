import { useState } from "react";
import MobileWrapper from "../../Components/MobileWrapper";
import FirstPage from "../../Components/FirstPage";
import Reservation from "../../Components/Reservation";
import QuranPage from "../../Components/QuranPage";
import BrideAndGroom from "../../Components/BrideAndGroom";
import Gallery from "../../Components/Gallery";
import Prayers from "../../Components/Prayers";
import TimeAndPlace from "../../Components/TimeAndPlace";
import { AppContext } from "../../Utils/context";
import { useContext } from "react";
import AudioControl from "../../Components/AudioControl";
import BookFlipContainer from "../../Components/BookFlipContainer";
import { wishes } from "../../constant";

const Home = () => {
  const [showFull, setShowFull] = useState(false);
  const prayers = wishes;
  const contextData = useContext(AppContext);

  const getPrayers = () => {
    return null;
  };

  return (
    <>
      <AudioControl />
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

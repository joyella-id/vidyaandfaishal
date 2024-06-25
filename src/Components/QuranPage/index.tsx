import React, { useContext } from "react";
import Flower from "../Flower";
import { AppContext } from "../../Utils/context";
import css from "./QuranPage.module.scss";

const QuranPage = () => {
  const { firstRenderHeight } = useContext(AppContext);
  return (
    <div
      style={{ height: `calc(${firstRenderHeight}px + 100px)` }}
      id="quranPage"
      className={`position-relative font-base-white ${css.container}`}
    >
      <div
        className={`position-relative font-size-24 font-align-right ${css.arabic}`}
      >
        وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا
        لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً
        ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ
        <Flower
          style={{
            width: "60%",
            position: "absolute",
            right: "-6rem",
            top: "0",
          }}
        />
      </div>
      <br />
      <br />
      <div className={`position-relative font-size-15 ${css.latin}`}>
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
        sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
        (kebesaran Allah) bagi kaum yang berpikir."{" "}
        <Flower
          style={{
            width: "60%",
            position: "absolute",
            left: "-6rem",
            top: "50%",
          }}
        />
      </div>
      <div className={css.surahContainer}>
        <div className={css.line}></div>
        <span>Ar-Rum: 21</span>
      </div>
    </div>
  );
};

export default QuranPage;

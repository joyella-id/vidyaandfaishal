/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useContext } from "react";
import { AppContext } from "../../Utils/context";
import css from "./Prayers.module.scss";
import Flower from "../Flower";
import maskIcon from "../../Images/mask.svg";
import distanceIcon from "../../Images/distance.svg";
import temperatureIcon from "../../Images/temperature.svg";
import washHandIcon from "../../Images/washhand.svg";
import { SinglePrayerType } from "../../Utils/types";

type PrayersPropTypes = {
  prayers: SinglePrayerType[];
};

const cautionIcons = [maskIcon, distanceIcon, temperatureIcon, washHandIcon];

const Prayers: React.FC<PrayersPropTypes> = ({ prayers }) => {
  const { firstRenderHeight } = useContext(AppContext);
  return (
    <div
      id="prayerPage"
      className={`overflow-hidden position-relative box-sizing-border-box padding--xxlarge-b padding--xxlarge-t padding--xxlarge-l padding--xxlarge-r`}
      style={{ minHeight: firstRenderHeight, transition: "0.2s" }}
    >
      <Flower style={{ position: "absolute", top: "-1rem", left: "-1rem" }} />
      <Flower style={{ position: "absolute", top: "30%", right: "-1rem" }} />
      <Flower style={{ position: "absolute", bottom: "30%", left: "-1rem" }} />
      <Flower
        style={{ position: "absolute", bottom: "-3rem", right: "-1rem" }}
      />
      {prayers?.length > 0 && (
        <>
          <div className="margin--large-b margin--xlarge-t font-family-neuton font-size-18 font-letter-spacing-2 font-base-white font-align-justify">
            Sebuah kebahagian yang sangat dalam bagi kami apabila
            Bapak/Ibu/ Saudara/i semua turut mendoakan pada hari bahagia kami.
          </div>
          <div className={css.prayersContainer}>
            {prayers?.map((prayer, i) => {
              const prayersLength = prayers?.length;
              const isLast = i + 1 === prayersLength;
              return (
                <div
                  className={`${!isLast ? "margin--large-b" : ""} ${
                    css.singlePrayer
                  }`}
                  key={`${prayer?.prayer}${i}`}
                >
                  <div className="font-size-15 font-weight-medium margin--xsmall-b">
                    {prayer?.name}
                  </div>
                  <div>{prayer?.prayer}</div>
                </div>
              );
            })}
          </div>
          <div className={css.line}></div>
        </>
      )}
      <div className="font-base-white margin--xxxlarge-t font-align-justify font-letter-spacing-2 font-family-neuton font-size-18">
        Dengan tidak mengurangi rasa hormat kami, untuk menjaga kesehatan kita
        semua serta tetap mengikuti protokol kesehatan. Semoga kita semua senantiasa diberikan kesehatan & kebahagiaan,
        Amin.
      </div>
      <div className={css.covidCautionContainer}>
        {cautionIcons?.map((icon) => (
          <div className={css.covidCaution} key={icon}>
            <img src={icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prayers;

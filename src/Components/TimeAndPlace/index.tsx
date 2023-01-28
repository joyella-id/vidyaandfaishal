import React from "react";
import { AppContext } from "../../Utils/context";
import Button from "../Button";
import css from "./TimeAndPlace.module.scss";
import Flower from "../Flower";
import { useTimer } from "../../Utils/common";
import { useContext } from "react";

const Countdown = () => {
  const weddingDate = new Date("2023-03-19");
  const timeLeft = useTimer({ endDate: weddingDate });
  return (
    <div className={`z-index-1 position-relative ${css.countdownContainer}`}>
      <div className={css.singleCountdown}>
        <div>
          <div className="font-family-bodoni-moda font-weight-medium font-size-32">
            {Math.floor(timeLeft.asDays())}
          </div>
          <div className="font-family-bodoni-moda">Hari</div>
        </div>
      </div>
      <div className={css.singleCountdown}>
        <div>
          <div className="font-family-bodoni-moda font-weight-medium font-size-32">
            {timeLeft.hours()}
          </div>
          <div className="font-family-bodoni-moda">Jam</div>
        </div>
      </div>
      <div className={css.singleCountdown}>
        <div>
          <div className="font-family-bodoni-moda font-weight-medium font-size-32">
            {timeLeft.minutes()}
          </div>
          <div className="font-family-bodoni-moda">Menit</div>
        </div>
      </div>
    </div>
  );
};

const TimeAndPlace = () => {
  const { firstRenderHeight } = useContext(AppContext);

  const titleClassname = "margin--small-b font-size-24 font-letter-spacing-2";
  const subtitleClassname = "font-size-18 font-letter-spacing-2";

  return (
    <div
      className={`position-relative z-index-1 ${css.container}`}
      style={{ minHeight: firstRenderHeight }}
    >
      <div className="z-index-1 position-relative margin--xlarge-b font-letter-spacing-3 font-family-bodoni-moda font-weight-medium font-size-28">
        <div>MINGGU</div>
        <div>19 MARET 2023</div>
      </div>
      <Countdown />
      <div className="margin--xxlarge-t z-index-1 position-relative">
        <a
          rel="noreferrer"
          target={"_blank"}
          href="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20230319T030000Z%2F20230319T050000Z&details=Vidya%20%26%20Faishal%27s%20Wedding%20Celebration&location=Graha%20Samudra%20Bumimoro&text=Vidya%20%26%20Faishal%27s%20Wedding"
        >
          <Button text="SIMPAN TANGGAL" onClick={() => null} />
        </a>
      </div>
      <div className="font-family-bodoni-moda z-index-1 position-relative">
        <div className="margin--xxxxxlarge-b margin--xxxxxxxlarge-t">
          <div className={titleClassname}>Akad Nikah</div>
          <div className={subtitleClassname}>08:00 - 09:00 WIB</div>
        </div>
        <div className="margin--xxxxxlarge-b">
          <div className={titleClassname}>Resepsi</div>
          <div className={subtitleClassname}>10:00 - 12:00 WIB</div>
        </div>
        <div className="margin--xxlarge-b">
          <div className={titleClassname}>GRAHA SAMUDRA BUMIMORO</div>
          <div className={"font-size-15 font-letter-spacing-2"}>
            Kobangdikal, Jl. Moro Krembangan, Morokrembangan, Kec. Krembangan,
            Kota SBY, Jawa Timur 60178
          </div>
        </div>
      </div>
      <div className="margin--xlarge-b">
        <a
          href="https://goo.gl/maps/r1wNUV1Ki86iUYjA7"
          rel="noreferrer"
          target={"_blank"}
          className="z-index-1 position-relative"
        >
          <Button variant="black" text="LIHAT PETA" onClick={() => null} />
        </a>
      </div>
      <Flower style={{ position: "absolute", top: "0", left: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "20%", left: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "40%", left: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "60%", left: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "80%", left: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "0", right: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "20%", right: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "40%", right: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "60%", right: "-5rem" }} />
      <Flower style={{ position: "absolute", top: "80%", right: "-5rem" }} />
    </div>
  );
};

export default TimeAndPlace;

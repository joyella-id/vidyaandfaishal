import React, { useContext } from "react";
import Button from "../Button";
import { AppContext } from "../../Utils/context";
import Flower from "../Flower";
import { useQuery } from "../../Utils/url";
import css from "./FirstPage.module.scss";
import coverGif from "../../Images/cover.gif";
import VidyaAndFaishal from "./VidyaAndFaishal";

type FirstPagePropTypes = {
  onClickCta: () => void;
  alreadyOpened: boolean;
};

const FirstPage: React.FC<FirstPagePropTypes> = ({
  onClickCta,
  alreadyOpened,
}) => {
  const { style } = useContext(AppContext);

  const query = useQuery();
  const name = (query.get("name") || "Yang Bersangkutan")?.toUpperCase();

  return (
    <div style={{ ...style }} className={`position-relative ${css.container}`}>
      <div className={css.imageContainer}>
        <div>
          <img src={coverGif} alt="cover" />
        </div>
        <div className={css.imageOverlay}></div>
      </div>
      <div className={css.pushDownContainer}></div>
      <div className={css.textPosition}>
        <div className="basic-text-shadow-3 font-family-bodoni-moda font-size-15 margin--xlarge-b font-base-white font-letter-spacing-3 z-index-1 position-relative">
          THE WEDDING OF
        </div>
        <div className="position-relative overflow-hidden">
          <Flower
            style={{
              zIndex: "1",
              width: "150px",
              position: "absolute",
              right: "-7%",
              bottom: "0.75rem",
            }}
          />
          <Flower
            style={{
              zIndex: "1",
              width: "150px",
              position: "absolute",
              left: "-7%",
              bottom: "0.75rem",
            }}
          />
          <VidyaAndFaishal />
        </div>
      </div>
      <div
        className={`font-family-neuton font-letter-spacing-2 ${css.whiteBackground}`}
      >
        <div className="font-size-15 font-weight-regular">Kepada Yth.</div>
        <div className="font-size-18 font-weight-medium ">{name}</div>

        <div className="font-size-15 font-transparent">Kepada Yth.</div>
      </div>
      <div className={css.greyBackground2}>
        <Button
          width="80%"
          text={`${alreadyOpened ? "LIHAT" : "BUKA"} UNDANGAN`}
          onClick={() => {
            onClickCta();
          }}
        />
      </div>
    </div>
  );
};

export default FirstPage;

import React, { useEffect, useState } from "react";
import css from "../FirstPage.module.scss";
import { useDebounce } from "../../../Utils/common";
import { useGyroscope } from "../../../Utils/gyroscope";

const VidyaAndFaishal = () => {
  const [clicked, setClicked] = useState(0);
  const {
    supported,
    backgroundPositionX,
    backgroundPositionY,
    askPermission,
    allowed,
  } = useGyroscope({ useVerticalAxis: true });

  useDebounce(`${clicked}`, 1000, () => {
    setClicked(0);
  });

  useEffect(() => {
    if (clicked >= 7 && !allowed) {
      askPermission();
    }
  }, [clicked]);

  const supportAccelerometer = supported;
  return (
    <>
      <div
        id="animated-text"
        style={{
          backgroundSize: supportAccelerometer ? "300%" : undefined,
          backgroundPositionX,
          backgroundPositionY,
        }}
        className={`font-family-great-vibes ${css.textContainer} ${
          !supportAccelerometer ? css.textShine : css.textGradient
        }`}
        onClick={() => {
          setClicked((prev) => prev + 1);
        }}
      >
        <div className="font-size-56 margin--medium-b">Vidya</div>
        <div className="font-size-32 margin--medium-b">&</div>
        <div className="font-size-56">Faishal</div>
      </div>
      <div className={`font-family-great-vibes ${css.textShadow}`}>
        <div className="font-size-56 margin--medium-b">Vidya</div>
        <div className="font-size-32 margin--medium-b">&</div>
        <div className="font-size-56">Faishal</div>
      </div>
    </>
  );
};

export default VidyaAndFaishal;

import React, { useContext } from "react";
import { GyroscopeContext } from "../../../Utils/context";
import css from "../FirstPage.module.scss";
import { useQuery } from "../../../Utils/url";

const VidyaAndFaishal = () => {
  const query = useQuery();
  const debugMode = !!query.get("debugmode");

  const {
    supported,
    backgroundPositionX,
    backgroundPositionY,
    allowed,
    clickToAskPermission,
  } = useContext(GyroscopeContext);

  const supportAccelerometer = supported;

  return (
    <>
      {debugMode && (
        <div
          style={{ color: "white" }}
        >{`${supported},${allowed},${backgroundPositionX},${backgroundPositionY}`}</div>
      )}
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
          clickToAskPermission();
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

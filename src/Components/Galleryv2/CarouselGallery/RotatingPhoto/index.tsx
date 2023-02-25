import React, { useState, useContext } from "react";
import { GyroscopeContext } from "../../../../Utils/context";
import { useQuery } from "../../../../Utils/url";
import { useNotDesktop } from "../../../../Utils/common";
import { renderDebugInfos } from "../../../../Utils/debug";
import paperTexture from "../../../../Images/white-paper-texture.jpg";
import css from "./RotatingPhoto.module.scss";

type RotatingPhotoPropTypes = {
  image: string;
};

const maxAccelerometerAngle = 30;

const cutoffAccelerometerAngle = (angle: number) => {
  if (angle < -maxAccelerometerAngle) {
    return -maxAccelerometerAngle;
  } else if (angle > maxAccelerometerAngle) {
    return maxAccelerometerAngle;
  }
  return angle;
};

const defineXandYRation = (
  getRenderedPhotoRect: () => DOMRect | undefined,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  const renderedPhotoRect = getRenderedPhotoRect();
  const xPosRaw = Math.ceil(e.clientX - (renderedPhotoRect?.x || 0));
  const xPos = xPosRaw < 0 ? 0 : xPosRaw;
  const yPos = Math.ceil(e.clientY - (renderedPhotoRect?.y || 0));
  const width = Math.ceil(renderedPhotoRect?.width || 0);
  const height = Math.ceil(renderedPhotoRect?.height || 0);
  const xRatio = (xPos / width) * 100;
  const yRatio = (yPos / height) * 100;
  return { xRatio, yRatio };
};

const RotatingPhoto: React.FC<RotatingPhotoPropTypes> = ({ image }) => {
  const query = useQuery();
  const debugMode = !!query.get("debugmode");
  const isNotDesktop = useNotDesktop();
  const isDesktop = !isNotDesktop;

  const [rotate3d, setRotate3d] = useState({
    rotate: false,
    xWhenActivated: 0,
    yWhenActivated: 0,
  });
  const getRenderedPhotoRect = () => {
    return document.getElementById("renderedPhoto")?.getClientRects()?.[0];
  };

  const {
    supported: supportAccelerometer,
    beta: y,
    gamma: x,
    allowed,
    clickToAskPermission,
  } = useContext(GyroscopeContext);

  const xAxis = Math.round(y || 0); // 35 - 65 degree
  const yAxis = Math.round(x || 0); // 60 - 90 degree

  const shineGradientColors = `rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, .35) 25%,
    rgba(255, 255, 255, .1) 50%,
    rgba(0, 0, 0, .5) 75%`;
  const shineGradientOpacity = "1";

  const notDesktopAndNotSupportAccelerometer =
    !supportAccelerometer && isNotDesktop;

  const rotateAble = isDesktop || (isNotDesktop && supportAccelerometer);

  const handleRotateByMouse =
    supportAccelerometer || notDesktopAndNotSupportAccelerometer
      ? {}
      : {
          onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const { xRatio, yRatio } = defineXandYRation(
              getRenderedPhotoRect,
              e
            );

            const xAngleRange = 20;
            const yAngleRange = 40;

            const rotateX = xAngleRange / 2 - (xRatio / 100) * xAngleRange;
            const rotateY = -yAngleRange / 2 + (yRatio / 100) * yAngleRange;

            const renderedPhotoElement =
              document.getElementById("renderedPhoto");
            if (renderedPhotoElement) {
              renderedPhotoElement.style.transform = `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;
            }
            const shineOverlayElement = document.getElementById("shineOverlay");
            if (shineOverlayElement) {
              shineOverlayElement.style.opacity = shineGradientOpacity;
              shineOverlayElement.style.background = `radial-gradient(
              circle at ${xRatio}% ${yRatio}%,
              ${shineGradientColors}
            )`;
            }
          },
          onMouseEnter: () => {
            const renderedPhotoElement =
              document.getElementById("renderedPhoto");
            if (renderedPhotoElement) {
              renderedPhotoElement.style.transition = "0.2s";
              setTimeout(() => {
                renderedPhotoElement.style.transition = "unset";
              }, 200);
            }
          },
          onMouseLeave: () => {
            const renderedPhotoElement =
              document.getElementById("renderedPhoto");
            if (renderedPhotoElement) {
              renderedPhotoElement.style.transition = "0.2s";
              renderedPhotoElement.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
            }
            const shineOverlayElement = document.getElementById("shineOverlay");
            if (shineOverlayElement) {
              shineOverlayElement.style.opacity = "0";
            }
          },
        };

  const rotatePhotoAccelerometerAngle = {
    x: cutoffAccelerometerAngle(xAxis - rotate3d.xWhenActivated),
    y: cutoffAccelerometerAngle(-yAxis + rotate3d.yWhenActivated),
  };

  const shineOverlayAccelerometerAngle = {
    x: 100 - ((rotatePhotoAccelerometerAngle.y + 30) / 60) * 100,
    y: ((rotatePhotoAccelerometerAngle.x + 30) / 60) * 100,
  };

  const handleRotateByAccelerometer = {
    photo: {
      style: {
        transition: "0.1s",
        transform: rotate3d.rotate
          ? `rotateY(${rotatePhotoAccelerometerAngle.y}deg) rotateX(${rotatePhotoAccelerometerAngle.x}deg)`
          : `rotateY(${0}deg) rotateX(${0}deg)`,
      },
    },
    shineOverlay: supportAccelerometer
      ? {
          style: rotate3d.rotate
            ? {
                opacity: shineGradientOpacity,
                background: `radial-gradient(
                  circle at ${shineOverlayAccelerometerAngle.x}% ${shineOverlayAccelerometerAngle.y}%,
                  ${shineGradientColors}
                )`,
              }
            : {
                opacity: "0",
              },
        }
      : { style: {} },
  };

  return (
    <>
      <div
        onClick={() => {
          setRotate3d((prev) => {
            if (prev.rotate) {
              return { ...prev, rotate: false };
            }
            return {
              rotate: true,
              xWhenActivated: xAxis,
              yWhenActivated: yAxis,
            };
          });
        }}
        className={css.rotateTrigger}
        {...(supportAccelerometer
          ? handleRotateByAccelerometer.photo
          : handleRotateByMouse)}
      >
        <div
          onClick={clickToAskPermission}
          className={`position-relative ${css.shownImage}`}
          id="renderedPhoto"
        >
          <img src={image} alt={`${image}`} />
          <div className={`font-family-neuton ${css.cta}`}>
            {rotateAble && (isNotDesktop ? "Click Me!" : "Hover Me!")}
          </div>
          <div
            {...handleRotateByAccelerometer.shineOverlay}
            id="shineOverlay"
            className={css.shineOverlay}
          ></div>
          <div className={css.paperTexture}>
            <img src={paperTexture} alt="paperTexture" />
          </div>
        </div>
      </div>
      {renderDebugInfos(debugMode, [
        supportAccelerometer,
        allowed,
        "accelerometerAngle",
        JSON.stringify(rotate3d),
        xAxis,
        yAxis,
        "photoangle",
        rotatePhotoAccelerometerAngle.x,
        rotatePhotoAccelerometerAngle.y,
        "overlay",
        shineOverlayAccelerometerAngle.x,
        shineOverlayAccelerometerAngle.y,
      ])}
    </>
  );
};

export default RotatingPhoto;

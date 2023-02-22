import React, { useState } from "react";
import { useGyroscope } from "../../../../Utils/gyroscope";
import { useQuery } from "../../../../Utils/url";
import css from "./RotatingPhoto.module.scss";

type RotatingPhotoPropTypes = {
  image: string;
};

const RotatingPhoto: React.FC<RotatingPhotoPropTypes> = ({ image }) => {
  const [rotate3d, setRotate3d] = useState(false);
  const getRenderedPhotoRect = () => {
    return document.getElementById("renderedPhoto")?.getClientRects()?.[0];
  };

  const {
    supported: supportAccelerometer,
    beta: y,
    gamma: x,
  } = useGyroscope({
    useVerticalAxis: true,
  });

  const xAxis = Math.round(y || 0); // 35 - 65 degree
  const yAxis = Math.round(x || 0); // 60 - 90 degree

  const maxAccelerometerAngle = 30;

  const cutoffAccelerometerAngle = (angle: number) => {
    if (angle < -maxAccelerometerAngle) {
      return -maxAccelerometerAngle;
    } else if (angle > maxAccelerometerAngle) {
      return maxAccelerometerAngle;
    }
    return angle;
  };

  const handleRotateByMouse = {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const renderedPhotoRect = getRenderedPhotoRect();
      const xPosRaw = Math.ceil(e.clientX - (renderedPhotoRect?.x || 0));
      const xPos = xPosRaw < 0 ? 0 : xPosRaw;
      const yPos = Math.ceil(e.clientY - (renderedPhotoRect?.y || 0));
      const width = Math.ceil(renderedPhotoRect?.width || 0);
      const height = Math.ceil(renderedPhotoRect?.height || 0);
      const xRatio = (xPos / width) * 100;
      const yRatio = (yPos / height) * 100;

      const xAngleRange = 20;
      const yAngleRange = 40;

      const rotateX = xAngleRange / 2 - (xRatio / 100) * xAngleRange;
      const rotateY = -yAngleRange / 2 + (yRatio / 100) * yAngleRange;

      const renderedPhotoElement = document.getElementById("renderedPhoto");
      if (renderedPhotoElement) {
        renderedPhotoElement.style.transform = `rotateY(${rotateX}deg) rotateX(${rotateY}deg)`;
      }
    },
    onMouseEnter: () => {
      const renderedPhotoElement = document.getElementById("renderedPhoto");
      if (renderedPhotoElement) {
        renderedPhotoElement.style.transition = "0.2s";
        setTimeout(() => {
          renderedPhotoElement.style.transition = "unset";
        }, 200);
      }
    },
    onMouseLeave: () => {
      const renderedPhotoElement = document.getElementById("renderedPhoto");
      if (renderedPhotoElement) {
        renderedPhotoElement.style.transition = "0.2s";
        renderedPhotoElement.style.transform = `rotateY(${0}deg) rotateX(${0}deg)`;
      }
    },
  };

  const handleRotateByAccelerometer = {
    style: {
      transition: "0.1s",
      transform: rotate3d
        ? `rotateY(${cutoffAccelerometerAngle(
            yAxis
          )}deg) rotateX(${cutoffAccelerometerAngle(-xAxis + 50)}deg)`
        : `rotateY(${0}deg) rotateX(${0}deg)`,
    },
  };

  return (
    <>
      <div
        onClick={() => {
          setRotate3d((prev) => !prev);
        }}
        className={css.rotateTrigger}
        {...(supportAccelerometer
          ? handleRotateByAccelerometer
          : handleRotateByMouse)}
      >
        <div className={css.shownImage} id="renderedPhoto">
          <img src={image} alt={`${image}`} />
        </div>
      </div>
    </>
  );
};

export default RotatingPhoto;

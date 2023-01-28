import { useEffect, useState } from "react";

type UseGyroscopeParam = {
  useVerticalAxis: boolean;
};

export const useGyroscope = ({ useVerticalAxis }: UseGyroscopeParam) => {
  const [allowed, setAllowed] = useState(false);

  const deviceOrientationExist = typeof DeviceOrientationEvent !== "undefined";

  const checkPermission = () => {
    if (
      deviceOrientationExist &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      setAllowed(false);
    } else {
      setAllowed(true);
    }
  };

  const askPermission = () => {
    if (
      deviceOrientationExist &&
      typeof (DeviceOrientationEvent as any).requestPermission === "function"
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((permissionState: string) => {
          if (permissionState === "granted") {
            setAllowed(true);
            window.addEventListener("deviceorientation", (e) => {
              setAccelerometerData(e);
            });
          } else {
            setAllowed(false);
          }
        })
        .catch(() => {
          setAllowed(false);
        });
    } else {
      setAllowed(true);
    }
  };

  //gamma is phone's side rotation
  //beta is phone's up and down rotation
  const [accelerometerData, setAccelerometerData] =
    useState<DeviceOrientationEvent | null>(null);
  useEffect(() => {
    checkPermission();
    window.addEventListener("deviceorientation", (e) => {
      setAccelerometerData(e);
    });
  }, []);

  const supportAccelerometer =
    accelerometerData?.alpha !== null &&
    accelerometerData?.beta !== null &&
    accelerometerData?.gamma !== null &&
    accelerometerData?.alpha !== undefined &&
    accelerometerData?.beta !== undefined &&
    accelerometerData?.gamma !== undefined &&
    allowed;

  let accelerometerX = 0;
  let accelerometerY = 0;
  if (supportAccelerometer) {
    accelerometerX = (((accelerometerData?.gamma || 0) + 90) / 180) * 100;
    accelerometerY = (((accelerometerData?.beta || 0) + 90) / 180) * 100;
  }

  const defineBackgroundPositionX = () => {
    if (useVerticalAxis) {
      const verticalAxisCompensation =
        (((accelerometerData?.beta || 0) + 90) / 180) * 20 - 15;
      return supportAccelerometer
        ? `${accelerometerX + verticalAxisCompensation}%`
        : undefined;
    }
    return supportAccelerometer ? `${accelerometerX}%` : undefined;
  };

  return {
    gamma: accelerometerData?.gamma,
    beta: accelerometerData?.beta,
    x: accelerometerX,
    y: accelerometerY,
    supported: supportAccelerometer,
    backgroundPositionX: defineBackgroundPositionX(),
    backgroundPositionY: supportAccelerometer
      ? `${accelerometerY}%`
      : undefined,
    askPermission,
    allowed,
  };
};

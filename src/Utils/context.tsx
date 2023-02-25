import { createContext, ReactNode, useEffect, useState } from "react";
import { useGyroscope } from "./gyroscope";
import { useWindowSize } from "./common";

export const AppContext = createContext({
  height: 0,
  style: {},
  styleStatic: {},
  firstRenderHeight: 0,
  windowWidth: 0,
});

type ContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [firstRenderHeight, setFirstRenderHeight] = useState(0);
  const { height: windowHeight, width: windowWidth } = useWindowSize();

  useEffect(() => {
    setFirstRenderHeight(windowHeight || 0);
  }, []);

  return (
    <AppContext.Provider
      value={{
        firstRenderHeight,
        height: windowHeight || 0,
        style: { height: `${windowHeight}px`, transition: "0.2s" },
        styleStatic: { height: `${firstRenderHeight}px`, transition: "0.2s" },
        windowWidth: windowWidth || 0,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

type GyroscopeContextType = {
  gamma: number | null | undefined;
  beta: number | null | undefined;
  x: number;
  y: number;
  supported: boolean;
  backgroundPositionX: string | undefined;
  backgroundPositionY: string | undefined;
  askPermission: () => void;
  allowed: boolean;
  clickToAskPermission: () => void;
};

export const GyroscopeContext = createContext<GyroscopeContextType>({
  gamma: 0,
  beta: 0,
  x: 0,
  y: 0,
  supported: false,
  backgroundPositionX: "0%",
  backgroundPositionY: "0%",
  askPermission: () => null,
  allowed: false,
  clickToAskPermission: () => null,
});

export const GyroscopeContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const gyroscopeDatas = useGyroscope({ useVerticalAxis: true });
  return (
    <GyroscopeContext.Provider value={gyroscopeDatas}>
      {children}
    </GyroscopeContext.Provider>
  );
};

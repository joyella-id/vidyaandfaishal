import { createContext, ReactNode, useEffect, useState } from "react";
import { useWindowSize } from "./common";

export const AppContext = createContext({
  height: 0,
  style: {},
  styleStatic: {},
  firstRenderHeight: 0,
  windowWidth: 0,
});

type AppContextProviderPropTypes = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderPropTypes> = ({
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

import React, { ReactNode } from "react";
import css from "./MobileWrapper.module.scss";

type MobileWrapperProps = {
  children: ReactNode;
};

const MobileWrapper: React.FC<MobileWrapperProps> = ({ children }) => {
  return (
    <div className={css.container}>
      <div className={css.childrenContainer}>{children}</div>
    </div>
  );
};

export default MobileWrapper;

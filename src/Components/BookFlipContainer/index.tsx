import React from "react";
import { ReactNode } from "react";
import { bookFlipTransitionDuration } from "../../constant";
import css from "./BookFlipContainer.module.scss";

type BookFlipContainerPropTypes = {
  belowPage?: ReactNode;
  frontCover: ReactNode;
  backCover: ReactNode;
  width: string;
  height: string;
  show: boolean;
  style?: Record<string, string>;
  positionAbsolute?: boolean;
};

const BookFlipContainer: React.FC<BookFlipContainerPropTypes> = ({
  belowPage,
  frontCover,
  backCover,
  width,
  height,
  show,
  positionAbsolute = false,
  style,
}) => {
  return (
    <div
      style={{
        ...style,
        width,
        height,
        ...(positionAbsolute ? { position: "absolute" } : {}),
      }}
      className={css.book}
    >
      <div
        style={{
          transition: `transform ${bookFlipTransitionDuration.second}s cubic-bezier(0.645, 0.045, 0.355, 1)`,
        }}
        className={`${css.book__page} ${css["book__page--2"]} ${
          show ? css.show : ""
        }`}
      >
        <div className={css["book__page-front"]}>{frontCover}</div>
        <div className={css["book__page-back"]}>{backCover}</div>
      </div>
      {belowPage}
    </div>
  );
};

export default BookFlipContainer;

import React, { useRef, useEffect, useState, ReactNode } from "react";
import css from "./Collapse.module.scss";

const defineMaxHeight = (
  show: boolean,
  realHeight: number,
  maxHeight?: string
) => {
  if (!show) {
    return "0px";
  }
  if (maxHeight) {
    return maxHeight;
  }
  return `${realHeight}px`;
};

type CollapsePropTypes = {
  children: ReactNode;
  show: boolean;
  maxHeight?: string;
  containerClassName?: string;
  divProps?: Record<string, string>;
  withAnimation?: boolean;
  additionalStyle?: Record<string, string>;
};

const Collapse: React.FC<CollapsePropTypes> = ({
  children,
  show,
  maxHeight,
  containerClassName = "",
  divProps = {},
  withAnimation = true,
  additionalStyle = {},
}) => {
  const childRef = useRef<HTMLDivElement>(null);
  const [noScroll, setNoScroll] = useState(false);
  const [childHeight, setChildHeight] = useState(0);

  useEffect(() => {
    setChildHeight(childRef?.current?.offsetHeight || 0);
  }, [children]);

  useEffect(() => {
    if (!show) {
      setChildHeight(0);
      setTimeout(() => {
        setNoScroll(false);
      }, 300);
    } else {
      setTimeout(() => {
        setNoScroll(true);
      }, 300);
    }
  }, [show]);

  return (
    <div
      {...divProps}
      style={{
        ...additionalStyle,
        maxHeight: `${defineMaxHeight(show, childHeight, maxHeight)}`,
      }}
      className={`${noScroll && css.noScroll} ${show ? css.show : css.hide} ${
        css.container
      } ${containerClassName} ${withAnimation && css.withAnimation}`}
    >
      <div ref={childRef}>{children}</div>
    </div>
  );
};

export default Collapse;

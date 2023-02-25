import React, { useEffect, useState } from "react";
import css from "../Gallery.module.scss";
import chevron from "../../../Images/chevron.svg";

const ScrollButton: React.FC<{
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
  variant: "left" | "right";
}> = ({ setHover, variant }) => {
  const [galleryContainerPosition, setGalleryContainerPosition] = useState<{
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number | string;
    width: number;
    x: number;
    y: number;
  }>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: "100%",
    width: 0,
    x: 0,
    y: 0,
  });

  const getGalleryContainerElement = () => {
    return document.getElementById("galleryContainer");
  };

  useEffect(() => {
    const galleryContainerElement = getGalleryContainerElement();
    if (galleryContainerElement) {
      window.addEventListener("scroll", () => {
        const currentTop = galleryContainerPosition.top;
        const galleryContainerRect =
          galleryContainerElement?.getBoundingClientRect();
        if (currentTop !== galleryContainerRect.top) {
          setGalleryContainerPosition({
            bottom: galleryContainerRect.bottom,
            x: galleryContainerRect.x,
            y: galleryContainerRect.y,
            top: galleryContainerRect.top,
            left: galleryContainerRect.left,
            right: galleryContainerRect.right,
            height: galleryContainerRect.height,
            width: galleryContainerRect.width,
          });
        }
      });
    }
  }, []);
  return (
    <div
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      style={{
        height: galleryContainerPosition.height - 9,
        top: galleryContainerPosition.top,
        [variant]: galleryContainerPosition.x,
      }}
      className={`${css.chevron} ${css[variant]} noselect`}
    >
      <img src={chevron} alt={variant} />
    </div>
  );
};

export default ScrollButton;

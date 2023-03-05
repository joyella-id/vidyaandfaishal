import React, { useEffect, useState } from "react";
import css from "./CarouselGallery.module.scss";
import RotatingPhoto from "./RotatingPhoto";

type CarouselGalleryPropTypes = {
  images: string[];
};

const CarouselGallery: React.FC<CarouselGalleryPropTypes> = ({ images }) => {
  const [pageDimension, setPageDimension] = useState({
    width: 0,
    height: 0,
  });
  const [renderedImage, setRenderedImage] = useState(-1);

  useEffect(() => {
    const galleryPage = document.getElementById("galleryPage");
    if (galleryPage) {
      setPageDimension({
        width: galleryPage?.clientWidth,
        height: galleryPage?.clientHeight,
      });
    }
  }, []);

  const imageDimension = 0.1 * pageDimension.height;
  const galleryHeight = imageDimension + 30;
  const galleryWidth = pageDimension.width - 64;

  return (
    <div className={css.galleryContainer}>
      <RotatingPhoto
        image={images[renderedImage] || images[images.length - 1]}
        changeImage={(index) => setRenderedImage(index)}
      />
      <div
        className="position-relative"
        style={{
          width: galleryWidth,
          height: `${galleryHeight}px`,
        }}
      >
        <div
          className={css.galleryBackground}
          style={{
            height: galleryWidth,
            top: `-${galleryWidth / 2 - galleryHeight / 2}px`,
            left: `${galleryWidth / 2 - galleryHeight / 2}px`,
          }}
        >
          <div className={`z-index-1 ${css.imagesContainer}`}>
            {images.map((image, i) => (
              <img
                onClick={() => {
                  setRenderedImage(i);
                }}
                style={{ height: imageDimension, width: imageDimension }}
                className={`${
                  i + 1 !== images.length ? css.marginBottom : ""
                } ${css.image} ${i === renderedImage ? css.selected : ""}`}
                key={i}
                src={image}
                alt={`${i}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselGallery;

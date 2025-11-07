import React from "react";
import { AppContext } from "../../Utils/context";
import { useContext } from "react";
import css from "./Gallery.module.scss";
import Flower from "../Flower";
import CarouselGallery from "./CarouselGallery";
import { Whatsapp } from "../Icons";

const imagesAmount = Array.from(Array(19).keys());

let galleryImages = imagesAmount.map((_, i) => {
  const filenameIndex = i + 1;
  return require(`../../Images/gallery/${filenameIndex}.jpeg`);
});

const Gallery = () => {
  const { firstRenderHeight } = useContext(AppContext);

  const whatsappNumber = "+6287815917683";
  const message =
    "Halo OurJoy by Joyella, apa bisa tanya tanya untuk pesan undangan online ?";
  const whatsappUrl = new URL(`https://wa.me/${whatsappNumber}`);
  whatsappUrl.searchParams.append("text", message);

  return (
    <div
      id="galleryPage"
      className={css.container}
      style={{ height: `${firstRenderHeight}px` }}
    >
      <Flower
        variant="black"
        style={{
          top: "-5%",
          left: "-10%",
          position: "absolute",
          zIndex: "0",
        }}
      />
      <Flower
        variant="black"
        style={{
          top: "5%",
          right: "-10%",
          position: "absolute",
          zIndex: "0",
        }}
      />
      <CarouselGallery images={galleryImages} />
      <div className={css.footer}>
        <div className={css.logoContainer}>
          <div>
            <img
              src="https://utfs.io/f/cda88ce7-1f16-41a8-a158-98f3c012e72c-5t0hc.svg"
              alt="ourjoy"
            />
          </div>
          <img
            src="https://utfs.io/f/4cc98e52-3e08-42df-ae9f-c689b7f9ae8c-zb0pnc.svg"
            alt="joyella"
          />
        </div>
        <div className={css.divider}></div>
        <div>
          <a
            href={whatsappUrl.toString()}
            target="_blank"
            className={css.circleIcon}
            rel="noreferrer"
          >
            <Whatsapp size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

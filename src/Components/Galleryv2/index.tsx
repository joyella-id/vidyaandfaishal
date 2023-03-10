import React from "react";
import { AppContext } from "../../Utils/context";
import { useContext } from "react";
import css from "./Gallery.module.scss";
import Flower from "../Flower";
import joyella from "../../Images/joyella.svg";
import instagram from "../../Images/joyellaInstagram.svg";
import whatsapp from "../../Images/joyellaWhatsapp.svg";
import CarouselGallery from "./CarouselGallery";

const imagesAmount = Array.from(Array(19).keys());

let galleryImages = imagesAmount.map((_, i) => {
  const filenameIndex = i + 1;
  return require(`../../Images/gallery/${filenameIndex}.jpeg`);
});

const Gallery = () => {
  const { firstRenderHeight } = useContext(AppContext);

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
      <div className={css.joyellaContainer}>
        <div className="font-family-bodoni-moda font-size-11">Made By</div>
        <img src={joyella} alt="joyella" />
        <div>
          <a
            href={`https://wa.me/6287815917683?text=%F0%9F%92%90%20Joyella%20E-Invitation%20%F0%9F%92%90%20Halo%20Joyella%2C%20apa%20bisa%20tanya%20tanya%20%26%20pesan%20e-invitation%3F%20%0A%0ABerikut%20data%20diri%20saya%0ANama%20%3D%0ANama%20akun%20ig%20%3D%0AKeperluan%20Acara%20%3D%20%28Wedding%2FEngagement%2FBirthday%2Flainnya%29%0A`}
            target="_blank"
            rel="noreferrer"
          >
            <img src={whatsapp} alt="whatsapp" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

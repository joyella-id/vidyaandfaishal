import React from "react";
import { AppContext } from "../../Utils/context";
import { useContext } from "react";
import image1 from "../../Images/gallery/1.jpeg";
import image2 from "../../Images/gallery/2.jpeg";
import image3 from "../../Images/gallery/3.jpeg";
import image4 from "../../Images/gallery/4.jpeg";
import image5 from "../../Images/gallery/5.jpeg";
import image6 from "../../Images/gallery/6.jpeg";
import image7 from "../../Images/gallery/7.jpeg";
import image8 from "../../Images/gallery/8.jpeg";
import image9 from "../../Images/gallery/9.jpeg";
import css from "./Gallery.module.scss";
import Flower from "../Flower";
import joyella from "../../Images/joyella.svg";
import instagram from "../../Images/joyellaInstagram.svg";
import whatsapp from "../../Images/joyellaWhatsapp.svg";

const galleryImages = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
];

const Gallery = () => {
  const { firstRenderHeight } = useContext(AppContext);
  return (
    <>
      <div
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
        <div className={`z-index-1 ${css.imagesContainer}`}>
          {galleryImages.map((image, i) => (
            <div className={css.image} key={i}>
              <img src={image} alt={`${i}`} />
            </div>
          ))}
        </div>
        <div className={css.joyellaContainer}>
          <img src={joyella} alt="joyella" />
          <div>
            <a
              href={`https://wa.me/6281336255090?text=%F0%9F%92%90%20Joyella%20E-Invitation%20%F0%9F%92%90%20Halo%20Joyella%2C%20apa%20bisa%20tanya%20tanya%20%26%20pesan%20e-invitation%3F%20%0A%0ABerikut%20data%20diri%20saya%0ANama%20%3D%0ANama%20akun%20ig%20%3D%0AKeperluan%20Acara%20%3D%20%28Wedding%2FEngagement%2FBirthday%2Flainnya%29%0A`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={whatsapp} alt="whatsapp" />
            </a>
            <a
              href={`https://www.instagram.com/joyella.id/`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="instagram" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;

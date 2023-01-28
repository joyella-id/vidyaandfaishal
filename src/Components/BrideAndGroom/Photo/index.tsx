import React from "react";
import css from "./Photo.module.scss";

type PhotoPropTypes = {
  src: string;
  alt: string;
};

const Photo: React.FC<PhotoPropTypes> = ({ src, alt }) => {
  return <img className={css.photo} src={src} alt={alt} />;
};

export default Photo;

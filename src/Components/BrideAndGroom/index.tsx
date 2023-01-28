import React, { useContext } from "react";
import { AppContext } from "../../Utils/context";
import Photo from "./Photo";
import photoVidya from "../../Images/vidya.jpeg";
import Flower from "../Flower";
import photoFaishal from "../../Images/faishal.jpeg";
import css from "./BrideAndGroom.module.scss";

type PersonPropTypes = {
  fullName: string;
  gender: string;
  father: string;
  mother: string;
  photo: string;
};

const genderMap: Record<string, string> = {
  f: "Putri",
  m: "Putra",
};

const flowerPositionMap: Record<string, string> = {
  f: "right",
  m: "left",
};

const InvitationText = () => {
  return (
    <div className={`font-family-neuton font-size-16 ${css.invitationText}`}>
      Dengan segala kerendahan hati & ucapan syukur atas karunia Tuhan, kami
      hendak menyampaikan kabar pernikahan kami
    </div>
  );
};

const Person: React.FC<PersonPropTypes> = ({
  fullName,
  gender,
  father,
  mother,
  photo,
}) => {
  return (
    <div className={`position-relative ${css.personContainer}`}>
      <Flower
        variant="black"
        style={{
          position: "absolute",
          top: "10%",
          // top: `${Math.floor(Math.random() * 50)}%`,
          [flowerPositionMap[gender]]: "50%",
        }}
      />
      <Photo src={photo} alt={fullName} />
      <div className="z-index-1 font-family-neuton font-size-20 font-letter-spacing-1 font-weight-medium">
        {fullName?.toUpperCase()}
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-18">
        {genderMap?.[gender]} dari
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-18">
        {father}
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-18">
        dan {mother}
      </div>
    </div>
  );
};

const BrideAndGroom = () => {
  const { firstRenderHeight } = useContext(AppContext);
  return (
    <div
      style={{ minHeight: firstRenderHeight }}
      className={`position-relative ${css.container}`}
    >
      <InvitationText />
      <div className="margin--xxlarge-b">
        <Person
          fullName="Vidya Pitaloka M.M."
          gender="f"
          father="Bpk. Kolonel Laut (T) Suryaman S.T."
          mother="Ibu Rr. Nyda Nidia Restina"
          photo={photoVidya}
        />
      </div>
      <div
        className={`margin--xxlarge-b font-family-great-vibes font-align-center font-size-70 ${css.andContainer}`}
      >
        &
      </div>
      <div className="margin--xxxxxlarge-b">
        <Person
          fullName="Faishal Abdur Rahman S.T."
          gender="m"
          father="Bpk. Ir. Mohamad Tantowi Mustofa"
          mother="Ibu Maratus Sholichah"
          photo={photoFaishal}
        />
      </div>
    </div>
  );
};

export default BrideAndGroom;

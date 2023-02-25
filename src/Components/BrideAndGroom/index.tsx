import React, { useContext } from "react";
import { AppContext } from "../../Utils/context";
import Photo from "./Photo";
import photoVidya from "../../Images/vidya.jpeg";
import Flower from "../Flower";
import photoFaishal from "../../Images/faishal.jpeg";
import css from "./BrideAndGroom.module.scss";

type PersonPropTypes = {
  childIndex: number;
  fullName: string;
  gender: string;
  father: string;
  mother: string;
  photo: string;
};

const childIndexMap: Record<string, string> = {
  1: "Pertama",
  2: "Kedua",
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
  childIndex,
}) => {
  return (
    <div className={`position-relative ${css.personContainer}`}>
      <Flower
        variant="black"
        style={{
          position: "absolute",
          top: "10%",
          [flowerPositionMap[gender]]: "50%",
        }}
      />
      <Photo src={photo} alt={fullName} />
      <div className="z-index-1 font-family-neuton font-size-20 font-letter-spacing-1 font-weight-medium">
        {fullName?.toUpperCase()}
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-16">
        {genderMap?.[gender]?.toUpperCase()}{" "}
        {childIndexMap?.[childIndex]?.toUpperCase()} DARI
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-16">
        {father}
      </div>
      <div className="z-index-1 font-family-neuton font-letter-spacing-1 font-size-16">
        & {mother}
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
          childIndex={1}
          fullName="VIDYA PITALOKA M.M."
          gender="f"
          father="BAPAK LAKSMA LAUT (T) SURYAMAN, S.T."
          mother="IBU RR. N. NIDIA R."
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
          childIndex={2}
          fullName="FAISHAL ABDUR RAHMAN S.T."
          gender="m"
          father="BAPAK IR. MOHAMAD TANTOWI MUSTOFA"
          mother="IBU MARATUS SOLICHAH"
          photo={photoFaishal}
        />
      </div>
    </div>
  );
};

export default BrideAndGroom;

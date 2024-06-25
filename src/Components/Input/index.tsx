import React from "react";
import InputLabel from "../InputLabel";
import css from "./Input.module.scss";
import { useMobile } from "../../Utils/common";

type InputPropTypes = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  label?: string;
  optional?: boolean;
  textArea?: boolean;
};

const Input: React.FC<InputPropTypes> = ({
  placeholder,
  onChange,
  value,
  label,
  optional,
  textArea,
}) => {
  const isMobile = useMobile();
  return (
    <>
      {label && <InputLabel optional={optional} label={label} />}
      {!!textArea ? (
        <textarea
          className={`font-family-bodoni-moda ${css.input}`}
          placeholder={placeholder}
          rows={isMobile ? 3 : 5}
          onChange={(e) => {
            onChange(e?.target?.value);
          }}
          value={value}
          style={{ resize: "none" }}
        />
      ) : (
        <input
          className={`font-family-bodoni-moda ${css.input}`}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e?.target?.value);
          }}
          value={value}
        />
      )}
    </>
  );
};

export default Input;

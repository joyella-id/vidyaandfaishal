import React from "react";
import InputLabel from "../InputLabel";
import css from "./Radio.module.scss";

type Choice = {
  label: string;
  value: string;
};

type RadioPropTypes = {
  label?: string;
  choices: Choice[];
  onChange: (selected: Choice) => void;
  selected: Choice;
  name: string;
};

const Radio: React.FC<RadioPropTypes> = ({
  label,
  choices,
  onChange,
  selected,
  name,
}) => {
  return (
    <div>
      {label && <InputLabel label={label} />}
      {choices.map((c) => (
        <label key={c.value} className={css.container}>
          {c.label}
          <input
            checked={selected?.value === c?.value}
            onChange={() => {
              onChange(c);
            }}
            type="radio"
            name={name}
          />
          <span className={css.checkmark}></span>
        </label>
      ))}
    </div>
  );
};

export default Radio;

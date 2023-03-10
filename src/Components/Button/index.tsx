import React, { useContext } from "react";
import { GyroscopeContext } from "../../Utils/context";
import Loader from "../Loader";
import css from "./Button.module.scss";

type ButtonPropTypes = {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "black" | "white";
  width?: string;
  disabled?: boolean;
  loading?: boolean;
};

const textColorByVariant = {
  black: "white",
  white: "black",
};

const Button: React.FC<ButtonPropTypes> = ({
  text,
  onClick,
  variant = "black",
  disabled = false,
  width = "100%",
  loading = false,
}) => {
  const { supported, backgroundPositionX, backgroundPositionY } =
    useContext(GyroscopeContext);
  const supportAccelerometer = supported;
  return (
    <button
      disabled={disabled}
      style={{ width, backgroundPositionX, backgroundPositionY }}
      className={`${css[variant]} ${css.button} ${css[variant]} ${
        supportAccelerometer ? css.withAccelerometer : css.withoutAccelerometer
      }`}
      onClick={loading ? () => null : onClick}
    >
      <div>
        {loading ? (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        ) : (
          <span
            className={`font-weight-medium font-size-15 font-letter-spacing-3 font-base-${textColorByVariant[variant]}`}
          >
            {text}
          </span>
        )}
      </div>
    </button>
  );
};

export default Button;

import React from "react";

type InputLabelPropTypes = {
  label: string;
  optional?: boolean;
};

const InputLabel: React.FC<InputLabelPropTypes> = ({ label, optional }) => {
  return (
    <div className="margin--xsmall-b font-family-bodoni-moda font-size-15">
      <span className="font-weight-bold">{label}</span>{" "}
      <span>{optional ? "(Optional)" : ""}</span>
    </div>
  );
};

export default InputLabel;

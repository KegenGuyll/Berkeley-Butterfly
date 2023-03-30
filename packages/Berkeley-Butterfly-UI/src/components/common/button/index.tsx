import React, { HTMLAttributes } from "react";
import SecondaryButton from "./secondaryButton";
import PrimaryButton from "./primaryButton";
import IconButton from "./iconButton";
import ChipButton from "./chipButton";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  onDelete?: () => void;
  variant: "primary" | "secondary" | "icon" | "chip";
}

const Button = ({ variant, ...props }: Props) => {
  switch (variant) {
    case "secondary":
      return <SecondaryButton {...props} />;
    case "primary":
      return <PrimaryButton {...props} />;
    case "icon":
      return <IconButton {...props} />;
    case "chip":
      return <ChipButton {...props} />;
    default:
      return <PrimaryButton {...props} />;
  }
};

export default Button;

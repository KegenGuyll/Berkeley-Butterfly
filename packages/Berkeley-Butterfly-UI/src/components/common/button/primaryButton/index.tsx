import React, { HtmlHTMLAttributes } from "react";
import clsx from "clsx";

type Props = HtmlHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        "p-2 bg-slate-800 text-white rounded hover:bg-slate-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

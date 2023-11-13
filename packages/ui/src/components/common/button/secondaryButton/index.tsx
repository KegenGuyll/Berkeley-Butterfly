import React, { HtmlHTMLAttributes } from "react";
import clsx from "clsx";

type Props = HtmlHTMLAttributes<HTMLButtonElement>;

const secondaryButton: React.FC<Props> = ({
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        "p-3 bg-white text-slate-800 rounded hover:bg-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default secondaryButton;

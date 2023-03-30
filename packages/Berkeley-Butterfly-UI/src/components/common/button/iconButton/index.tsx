import clsx from "clsx";
import React, { HtmlHTMLAttributes } from "react";

type Props = HtmlHTMLAttributes<HTMLButtonElement>;

const IconButton = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        "flex items-center py-1 px-2 bg-white hover:bg-gray-100 rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

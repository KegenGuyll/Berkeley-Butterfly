import React, { HtmlHTMLAttributes } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "..";

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  onDelete?: () => any;
}

const ChipButton = ({ children, className, onDelete, ...props }: Props) => {
  return (
    <div className={clsx("rounded-full border flex items-center", className)}>
      <button
        className={clsx("py-1 px-4", "transition-all duration-100 text-sm")}
        {...props}
      >
        {children}
      </button>
      {onDelete && (
        <div className="pr-3">
          <Button onClick={onDelete} variant="icon">
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChipButton;

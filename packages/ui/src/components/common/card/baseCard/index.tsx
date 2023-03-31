import clsx from "clsx";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

export interface BaseCardProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  contentPadding?: boolean;
  divider?: boolean;
  footer?: {
    href: string;
    text: string;
  };
  header?: string;
}

const BaseCard = ({
  children,
  header,
  footer,
  className,
  divider,
  contentPadding,
  ...props
}: BaseCardProps) => {
  return (
    <div
      className={clsx(
        "bg-white shadow rounded",
        divider && "divide-y divide-dotted w-full",
        className
      )}
      {...props}
    >
      {!!header && (
        <header className="flex items-center font-extrabold text-xs text-start py-2 mx-2">
          <h3>{header}</h3>
        </header>
      )}
      <div className={clsx(contentPadding && "px-3 pt-2")}>{children}</div>
      {!!footer && (
        <footer className="py-2 mx-2 text-center flex items-center justify-center mt-2">
          <Link
            className="text-xs font-semibold text-blue-500 hover:text-blue-600"
            href={footer.href}
          >
            {footer.text}
          </Link>
        </footer>
      )}
    </div>
  );
};

BaseCard.defaultProps = {
  contentPadding: true,
  divider: true,
};

export default BaseCard;

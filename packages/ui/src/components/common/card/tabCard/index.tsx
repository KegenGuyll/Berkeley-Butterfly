/* eslint-disable no-param-reassign */
import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import BaseCard, { BaseCardProps } from "../baseCard";

export type Category = {
  active: boolean;
  id: string;
  name: string;
};

export type Content = Record<string, React.ReactNode>;

interface Props {
  categories: Category[];
  content: Content;
  baseCardProps: BaseCardProps
}

const TabCard = memo(({ categories, content, ...baseCardProps }: Props) => {
  const [active, setActive] = useState<Category[]>([]);

  useEffect(() => {
    setActive(categories);
  }, [categories]);

  const handleActive = (id: string) => {
    const newActive = [...active];

    const index = newActive.findIndex((v) => v.id === id);

    newActive.forEach((v, i) => {
      if (i === index) {
        v.active = true;
      } else {
        v.active = false;
      }
    });

    setActive(newActive);
  };

  return (
    <BaseCard {...baseCardProps}>
      <>
        <nav>
          <ul className="flex" role="tablist">
            {categories.map((category) => (
              <li
                className={clsx(
                  "border-b-2  flex items-center w-full",
                  category.active
                    ? "border-b-2 border-slate-500"
                    : "border-transparent",
                  "transition-all duration-100"
                )}
                role="tab"
                key={category.id}
                title={category.name}
              >
                <button
                  className="w-full py-2 px-5"
                  onClick={() => handleActive(category.id)}
                  role="tab"
                  tabIndex={0}
                >
                  <span className=" font-semibold">{category.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          {Object.keys(content).map((con) => {
            return categories.map((cat) => {
              if (cat.id === con && cat.active) {
                return <div key={cat.id}>{content[con]}</div>;
              }

              return null;
            });
          })}
        </div>
      </>
    </BaseCard>
  );
});

export default TabCard;

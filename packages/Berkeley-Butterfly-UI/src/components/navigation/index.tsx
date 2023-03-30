import Link from "next/link";
import React from "react";

const routes = [
  {
    label: "Leagues",
    value: "/leagues",
  },
  {
    label: "Account",
    value: "/account",
  },
  {
    label: "Log out",
    value: "/",
  },
];

const MainNavigation = () => {
  return (
    <nav className=" bg-slate-800 text-white">
      <ul className="flex p-3 space-x-3">
        <li className="flex-grow">BRANDING</li>
        {routes.map((route) => (
          <li className="" key={route.value}>
            <Link href={route.value}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;

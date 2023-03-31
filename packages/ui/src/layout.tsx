import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MainNavigation from "./components/navigation";
import TeamHeader from "./components/navigation/teamHeader";
import { useAppDispatch } from "./hooks/redux";
import { setLeagueId } from "./redux/slices/activeLeague";
import PlayerHeader from "./components/navigation/playerHeader";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const code = localStorage.getItem("leagueId");

    dispatch(setLeagueId(Number(code)));

    if (!code) {
      router.push("/league-code");
    }
  }, []);

  return (
    <>
      <MainNavigation />
      <main>
        {router.asPath.includes("team") && <TeamHeader />}
        {router.asPath.includes("player") && <PlayerHeader />}
        <div className="w-full h-full flex justify-center items-center py-10 px-4">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;

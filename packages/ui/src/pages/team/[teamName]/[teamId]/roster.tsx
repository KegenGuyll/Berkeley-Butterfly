import { GetServerSideProps, NextPage } from "next";
import React, { useEffect } from "react";
import nookies from "nookies";
import { useRouter } from "next/router";
import getTeamRoster from "@/endpoints/team/players/getTeamRoster";
import { Player } from "@/models/players";
import PlayerTable from "@/components/table/playerTable";
import { useAppDispatch } from "@/hooks/redux";
import { setPlayers } from "@/redux/slices/activeLeague";
import usePlayers from "@/hooks/players";

// interface Props {
//   roster: Player[];
// }

const RosterPage = () => {
  const router = useRouter();
  const { teamId } = router.query

  const { findPlayerByTeam } = usePlayers()

  return (
    <div>
      <PlayerTable players={findPlayerByTeam(Number(teamId))} />
    </div>
  );
};

export default RosterPage;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const { leagueId } = nookies.get(context);
//     const { teamId } = context.query;

//     if (!leagueId) throw new Error("unable to find leagueId");

//     const numberLeagueId = Number(leagueId);
//     const numberTeamId = Number(teamId);

//     const roster = await getTeamRoster(numberLeagueId, numberTeamId);

//     return {
//       props: {
//         roster: roster.body,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {},
//       redirect: {
//         destination: "/league-code",
//         permanent: false,
//       },
//     };
//   }
//};

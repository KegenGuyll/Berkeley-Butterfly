import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import getTeamRoster from "@/endpoints/team/players/getTeamRoster";
import { Player } from "@/models/players";
import PlayerTable from "@/components/table/playerTable";

interface Props {
  roster: Player[];
}

const RosterPage: NextPage<Props> = ({ roster }: Props) => {
  return (
    <div>
      <PlayerTable players={roster} />
    </div>
  );
};

export default RosterPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { leagueId } = nookies.get(context);
    const { teamId } = context.query;

    if (!leagueId) throw new Error("unable to find leagueId");

    const numberLeagueId = Number(leagueId);
    const numberTeamId = Number(teamId);

    const roster = await getTeamRoster(numberLeagueId, numberTeamId);

    return {
      props: {
        roster: roster.body,
      },
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: "/league-code",
        permanent: false,
      },
    };
  }
};

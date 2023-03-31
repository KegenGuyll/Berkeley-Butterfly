import { GetServerSideProps, NextPage } from "next";
import React from "react";
import nookies from "nookies";
import Select, { SingleValue } from "react-select";
import { useRouter } from "next/router";
import { IGetTeamLeaders } from "@/models/team";
import getTeamLeaders from "@/endpoints/team/players/getTeamLeaders";
import PassingTable from "@/components/table/passingTable";
import RushingTable from "@/components/table/rushingTable";
import TabCard from "@/components/common/card/tabCard";
import DefenseTable from "@/components/table/defenseTable";
import ReceivingTable from "@/components/table/receivingTable";
import getAvailableSeasons from "@/endpoints/schedule/getAvailableSeasons";
import { IAvailableSeasonsResponse } from "@/models/schedule";
import OffenseTable from "@/components/table/teamOffenseTable";
import getTeamStats from "@/endpoints/team/getTeamStats";
import { DataType, TeamStats } from "@/models/stats";

interface Props {
  availableSeasons: IAvailableSeasonsResponse;
  defense: IGetTeamLeaders[];
  fetchedSeason: { label: number; value: number };
  offense: IGetTeamLeaders[];
  specialTeam: IGetTeamLeaders[];
  teamStats: TeamStats[];
}

const Stats: NextPage<Props> = ({
  offense,
  defense,
  availableSeasons,
  fetchedSeason,
  teamStats,
}: Props) => {
  const router = useRouter();

  const handleSeason = (
    newValue: SingleValue<{
      label: number;
      value: number;
    }>
  ) => {
    if (!newValue) return;
    router.query.seasonIndex = newValue.value.toString();

    router.push(router);
  };

  return (
    <div>
      <TabCard
        divider={false}
        categories={[
          {
            id: "1",
            active: true,
            name: "Players",
          },
          {
            id: "2",
            active: false,
            name: "Team",
          },
        ]}
        content={{
          "1": (
            <div className="space-y-6 mt-6">
              <div className="w-max space-y-3">
                <Select
                  defaultValue={fetchedSeason}
                  options={availableSeasons.body.map((s) => ({
                    label: s.year,
                    value: s.seasonIndex,
                  }))}
                  onChange={handleSeason}
                />
              </div>
              <div className="space-y-3">
                <h2>Passing</h2>
                <PassingTable stats={offense} />
              </div>
              <div className="space-y-3">
                <h2>Rushing</h2>
                <RushingTable stats={offense} />
              </div>
              <div className="space-y-3">
                <h2>Receiving</h2>
                <ReceivingTable stats={offense} />
              </div>
              <div className="space-y-3">
                <h2>Defense</h2>
                <DefenseTable stats={defense} />
              </div>
            </div>
          ),
          "2": (
            <div className="space-y-6 mt-6">
              <div className="w-max space-y-3">
                <Select
                  defaultValue={fetchedSeason}
                  options={availableSeasons.body.map((s) => ({
                    label: s.year,
                    value: s.seasonIndex,
                  }))}
                  onChange={handleSeason}
                />
              </div>
              <div className="space-y-3">
                <h2>Offense</h2>
                <OffenseTable stats={teamStats} />
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default Stats;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { leagueId } = nookies.get(context);
    const { teamId, seasonIndex } = context.query;

    if (!leagueId) throw new Error("unable to find leagueId");

    const numberLeagueId = Number(leagueId);
    const numberTeamId = Number(teamId);
    const numberSeasonIndex = Number(seasonIndex);

    const offense: IGetTeamLeaders[] = [];
    const defense: IGetTeamLeaders[] = [];
    const specialTeam: IGetTeamLeaders[] = [];

    const passing = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.PASSING,
      {
        sort_by: "passYds.desc",
        seasonIndex: numberSeasonIndex,
      }
    );
    const rushing = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.RUSHING,
      {
        sort_by: "rushAtt.desc",
        seasonIndex: numberSeasonIndex,
      }
    );
    const receiving = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.RECEIVING,
      {
        sort_by: "recYds.desc",
        seasonIndex: numberSeasonIndex,
      }
    );
    const defenseRequest = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.DEFENSE,
      {
        sort_by: "defTotalTackles.desc",
        seasonIndex: numberSeasonIndex,
      }
    );
    const kickingRequest = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.KICKING,
      {
        sort_by: "defTotalTackles.desc",
        seasonIndex: numberSeasonIndex,
      }
    );
    const puntingRequest = getTeamLeaders(
      numberLeagueId,
      numberTeamId,
      DataType.PUNTING,
      {
        sort_by: "defTotalTackles.desc",
        seasonIndex: numberSeasonIndex,
      }
    );

    const settlePromise = await Promise.allSettled([
      passing,
      rushing,
      receiving,
      defenseRequest,
      kickingRequest,
      puntingRequest,
    ]);

    const availableSeasons = await getAvailableSeasons(numberLeagueId);

    const teamStats = await getTeamStats(numberLeagueId, numberTeamId, {
      seasonIndex: numberSeasonIndex,
      season_type: "reg",
    });

    settlePromise.forEach((s) => {
      if (s.status === "fulfilled") {
        switch (s.value.body[0].dataType) {
          case "passing":
            offense.push(...s.value.body);
            break;
          case "rushing":
            offense.push(...s.value.body);
            break;
          case "receiving":
            offense.push(...s.value.body);
            break;
          case "defense":
            defense.push(...s.value.body);
            break;
          default:
            specialTeam.push(...s.value.body);
            break;
        }
      }
    });

    return {
      props: {
        offense: [...offense],
        defense: [...defense],
        specialTeam: [...specialTeam],
        availableSeasons,
        fetchedSeason: {
          label: 2022 + numberSeasonIndex,
          value: numberSeasonIndex,
        },
        teamStats: teamStats.body,
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

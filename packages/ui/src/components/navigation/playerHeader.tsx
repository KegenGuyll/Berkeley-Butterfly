import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import TeamImage from "../common/image/teamImage";
import Button from "../common/button";
import getPlayer from "@/endpoints/players/getPlayer";
import { Player } from "@/models/players";
import PlayerPortrait from "../common/image/playerPortrait";
import InchesToFeet from "@/utils/inchesToFeet";
import getRankedSeasonStats from "@/endpoints/stats/getRankedSeasonStats";
import { RankedPlayerStats } from "@/models/stats";
import { positionToDataType } from "@/utils/dataType";
import ProfileSeasonStats from "../players/seasonStats/profileSeasonStats";

const PlayerHeader = () => {
  const [player, setPlayer] = useState<Player>();
  const [ranked, setRanked] = useState<RankedPlayerStats>();
  const router = useRouter();
  const { rosterId, seasonIndex } = router.query;

  const fetchPlayer = useCallback(async () => {
    const leagueId = localStorage.getItem("leagueId");

    if (leagueId && typeof rosterId === "string") {
      const playerData = await getPlayer(Number(leagueId), Number(rosterId), {
        include_team: true,
      });
      const rankedData = await getRankedSeasonStats(
        Number(leagueId),
        positionToDataType(playerData.body.position),
        {
          seasonIndex: Number(seasonIndex),
          rosterId: Number(rosterId),
        }
      );

      if (playerData.success) {
        setPlayer(playerData.body);
      }

      if (rankedData.success) {
        setRanked(rankedData.body);
      }
    }
  }, [router.query]);

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  if (!player) return null;

  return (
    <div
      className={clsx(
        "bg-white shadow px-1 py-3 flex flex-col justify-between w-full m-auto lg:sticky top-0 z-50",
        "lg:flex-row lg:divide-x lg:px-6 space-y-3"
      )}
    >
      <div className="flex flex-row items-center justify-start w-full text-sm">
        <div className="lg:h-48 lg:w-48 h-36 w-36 relative mr-2">
          <PlayerPortrait
            playerName={`${player.firstName} ${player.lastName}`}
            rounded={false}
            portraitId={player.portraitId}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <h1 className="text-lg lg:text-3xl flex flex-col justify-start">
            <span className="font-light">{player.firstName}</span>
            <span className="font-bold">{player.lastName}</span>
          </h1>
          <span className="divide-x space-x-3 text-gray-800 flex items-center">
            {!!player.team && (
              <span className="space-x-1 flex items-center">
                <div className="h-5 w-5 relative">
                  <TeamImage teamLogoId={player.team?.logoId} />
                </div>
                <span className="hidden md:block">{player.team?.cityName}</span>
                <span>{player.team?.nickName}</span>
              </span>
            )}
            <span className="pl-2">#{player.jerseyNum}</span>
            <span className="pl-2">{player.position}</span>
          </span>
          <div className="flex items-center space-x-2">
            <Button className="w-max" variant="chip">
              Follow
            </Button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "w-full flex flex-col border rounded justify-center items-center lg:px-3 text-sm",
          "lg:border-none"
        )}
      >
        <div className="bg-slate-700 lg:hidden block text-base text-white rounded-t w-full px-3 py-1 text-center">
          <h2>Information</h2>
        </div>
        <ul className="space-y-1 py-2 lg:space-y-3 w-full px-3">
          <li className="flex items-center md:text-xs xl:text-sm">
            <span className="flex-grow font-light">HT/WT</span>
            <span className="space-x-2 font-bold">
              <span>{InchesToFeet(player.height)},</span>
              <span>{player.weight} lbs</span>
            </span>
          </li>
          <li className="flex items-center md:text-xs xl:text-sm">
            <span className="flex-grow font-light">BIRTHDATE</span>
            <span className="space-x-2 font-bold">
              <span>
                {player.birthMonth}/{player.birthDay}/{player.birthYear}
              </span>
              <span>({player.age})</span>
            </span>
          </li>
          <li className="flex items-center md:text-xs xl:text-sm">
            <span className="flex-grow font-light ">COLLEGE</span>
            <span className="space-x-2 font-bold">
              <span>{player.college.toUpperCase()}</span>
            </span>
          </li>
          <li className="flex items-center md:text-xs xl:text-sm">
            <span className="flex-grow font-light">DRAFT INFO</span>
            <span className="space-x-2 font-bold">
              <span>{player.rookieYear - Number(seasonIndex)}:</span>
              <span>Rd {player.draftRound},</span>
              <span>Pk {player.draftPick}</span>
            </span>
          </li>
        </ul>
      </div>
      <ProfileSeasonStats
        seasonIndex={Number(seasonIndex)}
        ranked={ranked}
        dataType={positionToDataType(player.position)}
      />
    </div>
  );
};

export default PlayerHeader;

import { NextPage } from "next";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BaseCard from "@/components/common/card/baseCard";
import { useAppSelector } from "@/hooks/redux";
import InchesToFeet from "@/utils/inchesToFeet";
import ordinalSuffix from "@/utils/ordinalSuffix";
import fipsToState from "@/utils/fipsToState";

interface BioListProps
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  label: string;
}

const BioList = ({ children, label }: BioListProps) => {
  return (
    <li className="flex">
      <span className="text-sm font-light flex-grow">
        {label.toUpperCase()}
      </span>
      <span>{children}</span>
    </li>
  );
};

const PlayerBio: NextPage = () => {
  const { player } = useAppSelector((state) => state.playerSlice);
  const router = useRouter();

  const { seasonIndex } = router.query;

  if (!player) return null;

  return (
    <div className="w-full">
      <BaseCard header="Biography">
        <ul className="space-y-1">
          <BioList label="Team">
            <Link
              href={`/team/${player?.team?.displayName}/${player?.teamId}/${seasonIndex}`}
            >
              {player?.team?.displayName}
            </Link>
          </BioList>
          <BioList label="Position">{player?.position}</BioList>
          <BioList label="HT/WT">
            <div className="space-x-1">
              <span>{InchesToFeet(player.height)},</span>
              <span>{player.weight} lbs</span>
            </div>
          </BioList>
          <BioList label="Birthdate">
            <div className="space-x-1">
              <span>
                {player.birthMonth}/{player.birthDay}/{player.birthYear}
              </span>
              <span>({player.age})</span>
            </div>
          </BioList>
          <BioList label="College">{player.college}</BioList>
          <BioList label="Draft Info">
            <div className="space-x-1">
              <span>{player.rookieYear - Number(seasonIndex)}:</span>
              <span>Rd {player.draftRound - 1},</span>
              <span>Pk {player.draftPick - 1}</span>
            </div>
          </BioList>
          <BioList label="Status" />
          <BioList label="Experience">
            {ordinalSuffix(player.rookieYear - Number(seasonIndex))}
          </BioList>
          <BioList label="Birthplace">
            <div className="space-x-1">
              {player.homeTown !== "PLACEHOLDER" && (
                <span>{player.homeTown},</span>
              )}
              <span>{fipsToState(player.homeState)}</span>
            </div>
          </BioList>
        </ul>
      </BaseCard>
    </div>
  );
};

export default PlayerBio;

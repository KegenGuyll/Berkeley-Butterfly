import React from "react";
import { IGetTeamLeaders } from "@/models/team";
import TeamLeaderCard from ".";

interface Props {
  leadingPasser: IGetTeamLeaders | undefined;
  leadingRec: IGetTeamLeaders | undefined;
  leadingRusher: IGetTeamLeaders | undefined;
  seasonIndex: number;
}

const OffenseList = ({
  leadingPasser,
  leadingRec,
  leadingRusher,
  seasonIndex,
}: Props) => {
  return (
    <div>
      {leadingPasser && leadingPasser.dataType === "passing" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Passing Yards",
            value: leadingPasser.passYds,
          }}
          keyStats={[
            {
              key: "passerRating",
              title: "QBR",
            },
            {
              key: "passTDs",
              title: "TD",
            },
          ]}
          player={leadingPasser}
          seasonIndex={seasonIndex}
        />
      )}
      {leadingRusher && leadingRusher.dataType === "rushing" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Rushing Yards",
            value: leadingRusher.rushYds,
          }}
          keyStats={[
            {
              key: "rushAtt",
              title: "CAR",
            },
            {
              key: "rushTDs",
              title: "TD",
            },
          ]}
          player={leadingRusher}
          seasonIndex={seasonIndex}
        />
      )}
      {leadingRec && leadingRec.dataType === "receiving" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Receiving Yards",
            value: leadingRec.recYds,
          }}
          keyStats={[
            {
              key: "recCatches",
              title: "REC",
            },
            {
              key: "recTDs",
              title: "TD",
            },
          ]}
          player={leadingRec}
          seasonIndex={seasonIndex}
        />
      )}
    </div>
  );
};

export default OffenseList;

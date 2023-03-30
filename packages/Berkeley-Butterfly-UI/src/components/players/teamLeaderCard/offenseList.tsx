import React from "react";
import { IGetTeamLeaders } from "@/models/team";
import TeamLeaderCard from ".";

interface Props {
  leadingPasser: IGetTeamLeaders | undefined;
  leadingRec: IGetTeamLeaders | undefined;
  leadingRusher: IGetTeamLeaders | undefined;
}

const OffenseList = ({ leadingPasser, leadingRec, leadingRusher }: Props) => {
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
        />
      )}
    </div>
  );
};

export default OffenseList;

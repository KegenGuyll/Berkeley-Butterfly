import React, { useEffect, useState } from "react";
import { IGetTeamLeaders } from "@/models/team";
import TeamLeaderCard from ".";

interface Props {
  defense: IGetTeamLeaders[];
  seasonIndex: number;
}

const sortDefense = (
  a: IGetTeamLeaders,
  b: IGetTeamLeaders,
  type: "defInts" | "defTotalTackles" | "defSacks"
) => {
  if (a.dataType !== "defense" || b.dataType !== "defense") return 0;

  if (a[type] < b[type]) return 1;

  if (a[type] > b[type]) return -1;

  return 0;
};

const DefenseList = ({ defense, seasonIndex }: Props) => {
  const [leadingTackles, setLeadingTackles] = useState<IGetTeamLeaders>();
  const [leadingSacks, setLeadingSacks] = useState<IGetTeamLeaders>();
  const [leadingInt, setLeadingInt] = useState<IGetTeamLeaders>();

  useEffect(() => {
    const tackles = defense.sort((a, b) =>
      sortDefense(a, b, "defTotalTackles")
    )[0];
    const sacks = defense.sort((a, b) => sortDefense(a, b, "defSacks"))[0];
    const ints = defense.sort((a, b) => sortDefense(a, b, "defInts"))[0];

    setLeadingTackles(tackles);
    setLeadingSacks(sacks);
    setLeadingInt(ints);
  }, [defense]);

  return (
    <div>
      {leadingTackles && leadingTackles.dataType === "defense" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Tackles",
            value: leadingTackles.defTotalTackles,
          }}
          keyStats={[
            {
              key: "defSacks",
              title: "Sacks",
            },
            {
              key: "defInts",
              title: "Ints",
            },
          ]}
          player={leadingTackles}
          seasonIndex={seasonIndex}
        />
      )}
      {leadingSacks && leadingSacks.dataType === "defense" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Sacks",
            value: leadingSacks.defSacks,
          }}
          keyStats={[
            {
              key: "defTotalTackles",
              title: "Tackles",
            },
          ]}
          player={leadingSacks}
          seasonIndex={seasonIndex}
        />
      )}
      {leadingInt && leadingInt.dataType === "defense" && (
        <TeamLeaderCard
          highlightedStat={{
            title: "Interceptions",
            value: leadingInt.defInts,
          }}
          keyStats={[
            {
              key: "defDeflections",
              title: "PD",
            },
            {
              key: "defCatchAllowed",
              title: "CA",
            },
          ]}
          player={leadingInt}
          seasonIndex={seasonIndex}
        />
      )}
    </div>
  );
};

export default DefenseList;

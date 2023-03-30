import React from "react";
import Image from "next/image";

import nflImageKey from "../../../data/nfl-teams.json";

interface Props {
  teamLogoId: number;
}

const TeamImage = ({ teamLogoId }: Props) => {
  return (
    <Image
      fill
      src={`/images/nfl-logos/${
        (nflImageKey[teamLogoId.toString() as never] as any).photoUrl as string
      }`}
      alt={teamLogoId.toString()}
    />
  );
};

export default TeamImage;

import React from "react";
import Image from "next/image";

interface Props {
  playerName: string;
  portraitId: number;
}

const PlayerPortrait = ({ portraitId, playerName }: Props) => {
  return (
    <Image
      className="rounded-full"
      alt={`${playerName} portrait`}
      fill
      objectFit="cover"
      src={`https://madden-assets-cdn.pulse.ea.com/madden23/portraits/256/${portraitId}.png`}
    />
  );
};

export default PlayerPortrait;

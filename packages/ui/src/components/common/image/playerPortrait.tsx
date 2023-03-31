import React from "react";
import Image from "next/image";
import clsx from "clsx";

interface Props {
  playerName: string;
  portraitId: number;
  rounded?: boolean;
}

const PlayerPortrait = ({ portraitId, playerName, rounded }: Props) => {
  return (
    <Image
      className={clsx(rounded && "rounded-full border")}
      alt={`${playerName} portrait`}
      fill
      objectFit="cover"
      src={`https://madden-assets-cdn.pulse.ea.com/madden23/portraits/256/${portraitId}.png`}
    />
  );
};

PlayerPortrait.defaultProps = {
  rounded: true,
};

export default PlayerPortrait;

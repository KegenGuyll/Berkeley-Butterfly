import Link from "next/link";
import TeamImage from "@/components/common/image/teamImage";
import { isHome, isWin } from "@/utils/schedule";

interface CustomElementProps {
  row: any;
}

const OppElement = ({ row }: CustomElementProps) => {
  return (
    <div className="flex space-x-1 items-center flex-grow w-full">
      <span className="text-xs mr-1 text-left text-gray-500">
        {isHome(row.homeTeamId, row.teamId) ? "VS" : "@"}
      </span>
      <div className="h-5 w-5 relative mr-1">
        <TeamImage
          teamLogoId={
            isHome(row.homeTeamId, row.teamId)
              ? ((row.awayTeam?.logoId || 0) as any)
              : ((row.homeTeam?.logoId || 0) as any)
          }
        />
      </div>
      <Link
        className="text-blue-500"
        href={
          isHome(row.homeTeamId, row.teamId)
            ? `/team/${row.awayTeam.nickName}/${row.awayTeamId}/${row.seasonIndex}`
            : `/team/${row.homeTeam.nickName}/${row.homeTeamId}/${row.seasonIndex}`
        }
      >
        {isHome(row.homeTeamId, row.teamId)
          ? row.awayTeam.abbrName
          : row.homeTeam.abbrName}
      </Link>
    </div>
  );
};

const ResultElement = ({ row }: CustomElementProps) => {
  return (
    <span>
      {row.status !== 1 && (
        <div className="text-xs items-end">
          {isWin(row.homeTeamId, row.teamId, row.homeScore, row.awayScore) ? (
            <span className=" text-green-500 mr-1">W</span>
          ) : (
            <span className="text-red-500 mr-1 ">L</span>
          )}

          {row.homeScore > row.awayScore ? (
            <span>{`${row.homeScore}-${row.awayScore}`}</span>
          ) : (
            <span>{`${row.awayScore}-${row.homeScore}`}</span>
          )}
        </div>
      )}
    </span>
  );
};

export { ResultElement, OppElement };

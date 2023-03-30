import { DataType, IRankedStatCategory } from "../../../models/teams";
import getLeagueLeadersService from "./getLeagueLeaders";
import { AppError, HttpCode } from "../../../expections/AppError";
import { sortByDataType } from "../../../utils/common";

// TODO: issue-14 need to have set rules for what players should be counted in the ranked stat
// for example if you have someone that had a 134 QBR and has only thrown 5 passes

const rankedStatCategoryService = async (
  leagueId: number,
  dataType: DataType,
  query: IRankedStatCategory
) => {
  const leagueLeaders = await getLeagueLeadersService(leagueId, dataType, {
    seasonIndex: query.seasonIndex,
    limit: false,
  });

  if (!leagueLeaders.success)
    throw new AppError({
      httpCode: HttpCode.BAD_REQUEST,
      description: "unable to get league leaders",
    });

  // confirm player is in the array
  const playerIndex = leagueLeaders.body.findIndex(
    (value) => value._id.rosterId === query.rosterId
  );

  if (playerIndex === -1)
    throw new AppError({
      httpCode: HttpCode.NOT_FOUND,
      description: `${query.rosterId} is not found in this ${dataType} dataType`,
    });

  const originalArray = [...leagueLeaders.body];
  let player = originalArray[playerIndex];
  const sortableArray = [...leagueLeaders.body];

  sortByDataType(dataType).forEach((sort) => {
    const [name] = sort.split(".");

    if (player[name]) {
      sortableArray.sort((a, b) => {
        if (a[name] > b[name]) return -1;

        if (a[name] < b[name]) return 1;

        return 0;
      });
    }

    const index = sortableArray.findIndex(
      (v) => v._id.rosterId === query.rosterId
    );
    const rankedCategory = `${name}Pos`;
    player = {
      ...player,
      ranking: {
        ...player.ranking,
        [rankedCategory]: index + 1,
      },
    };
  });

  return { success: true, body: player };
};

export default rankedStatCategoryService;

// get all the players at the given position with season stats

// determine the category for ranking
// sort the player array based on criteria
// find the given player in the array
// track the index + 1 = stat ranked position
// **repeat until all categories are filled

// return results to user

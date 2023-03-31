import { Document } from "mongodb";
import { mongoService, dbName } from "../../..";
import { IGetPlayerByPositionQuery } from "../../../models/teams";

const getPlayerByPositionService = async (
  leagueId: number,
  teamId: number,
  position: string,
  query: IGetPlayerByPositionQuery
) => {
  const db = mongoService.db(dbName).collection("players");

  const pipeline: Document[] = [
    {
      $match: {
        leagueId,
        teamId,
        position,
      },
    },
    {
      $sort: {
        playerBestOvr: -1,
      },
    },
  ];

  if (query.include_teams) {
    pipeline.push({
      $lookup: {
        from: "teams",
        localField: "_id.teamId",
        pipeline: [
          {
            $match: {
              leagueId,
            },
          },
        ],
        foreignField: "teamId",
        as: "team",
      },
    });
    pipeline.push({
      $unwind: {
        path: "$team",
      },
    });
  }

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default getPlayerByPositionService;

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

  const positionFind: any[] = [{ position }];

  if (position === "OL") {
    positionFind.push({ position: "LT" });
    positionFind.push({ position: "RT" });
    positionFind.push({ position: "LG" });
    positionFind.push({ position: "RG" });
    positionFind.push({ position: "C" });
  }

  if (position === "DL") {
    positionFind.push({ position: "LE" });
    positionFind.push({ position: "RE" });
    positionFind.push({ position: "DT" });
  }

  if (position === "DB") {
    positionFind.push({ position: "CB" });
    positionFind.push({ position: "FS" });
    positionFind.push({ position: "SS" });
  }

  if (position === "LB") {
    positionFind.push({ position: "LOLB" });
    positionFind.push({ position: "ROLB" });
    positionFind.push({ position: "MLB" });
  }

  const pipeline: Document[] = [
    {
      $match: {
        leagueId,
        teamId,
        $or: positionFind,
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

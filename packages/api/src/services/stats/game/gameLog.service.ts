import { Document } from "mongodb";
import { mongoService, dbName } from "../../..";
import { IGameLogQuery } from "../../../models/stats";
import convertDataType from "../../../utils/convertDataType";
import { DataType } from "../../../models/teams";

const dataTypes: DataType[] = [
  "defense",
  "kicking",
  "punting",
  "receiving",
  "rushing",
  "passing",
];

const gameLogService = async (leagueId: number, query: IGameLogQuery) => {
  const db = mongoService.db(dbName).collection("schedules");

  const pipeline: Document[] = [
    {
      $match: {
        leagueId,
        seasonIndex: 6,
        $or: [
          {
            homeTeamId: query.teamId,
          },
          {
            awayTeamId: query.teamId,
          },
        ],
      },
    },
  ];

  dataTypes.forEach((v) => {
    pipeline.push({
      $lookup: {
        from: convertDataType(v),
        localField: "scheduleId",
        pipeline: [
          {
            $match: {
              rosterId: query.rosterId,
              leagueId,
              seasonIndex: 6,
            },
          },
        ],
        foreignField: "scheduleId",
        as: `${v}Stats`,
      },
    });
  });

  pipeline.push({
    $lookup: {
      from: "teams",
      localField: "homeTeamId",
      pipeline: [
        {
          $match: {
            leagueId,
          },
        },
      ],
      foreignField: "teamId",
      as: "homeTeam",
    },
  });
  pipeline.push({
    $lookup: {
      from: "teams",
      localField: "awayTeamId",
      pipeline: [
        {
          $match: {
            leagueId,
          },
        },
      ],
      foreignField: "teamId",
      as: "awayTeam",
    },
  });
  pipeline.push({
    $unwind: {
      path: "$homeTeam",
    },
  });
  pipeline.push({
    $unwind: {
      path: "$awayTeam",
    },
  });

  const result = await db.aggregate(pipeline).toArray();

  return { success: true, body: result };
};

export default gameLogService;

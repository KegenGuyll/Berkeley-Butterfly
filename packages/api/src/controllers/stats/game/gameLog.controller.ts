import { Request, Response } from "express";
import gameLogService from "../../../services/stats/game/gameLog.service";
import { IGameLogQuery } from "../../../models/stats";

const gameLogController = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    const player = await gameLogService(
      Number(leagueId),
      req.query as unknown as IGameLogQuery
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default gameLogController;

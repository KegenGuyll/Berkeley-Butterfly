import { Request, Response } from "express";
import getPlayerByPositionService from "../../../services/teams/players/getPlayerByPosition.service";
import { IGetPlayerByPositionQuery } from "../../../models/teams";

const getPlayerByPositionController = async (req: Request, res: Response) => {
  try {
    const { leagueId, teamId, position } = req.params;

    const player = await getPlayerByPositionService(
      Number(leagueId),
      Number(teamId),
      position,
      req.query as IGetPlayerByPositionQuery
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default getPlayerByPositionController;

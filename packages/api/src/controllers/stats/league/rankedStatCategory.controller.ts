import { Request, Response } from "express";
import { DataType, IRankedStatCategory } from "../../../models/teams";
import rankedStatCategoryService from "../../../services/stats/league/rankedStatCategory.service";

const rankedStatCategoryController = async (req: Request, res: Response) => {
  try {
    const { leagueId, dataType } = req.params;

    const player = await rankedStatCategoryService(
      Number(leagueId),
      dataType as DataType,
      req.query as unknown as IRankedStatCategory
    );

    res.send(player);
  } catch (error) {
    res.status(500).send({ success: false, error });
  }
};

export default rankedStatCategoryController;

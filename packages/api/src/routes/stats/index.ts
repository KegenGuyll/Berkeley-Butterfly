import { Router, Request, Response, NextFunction } from "express";
import asyncMiddleware from "../../middleware/async.middleware";
import errorHandler from "../../expections/ErrorHandler";
import {
  getGameLogValidation,
  getLeagueLeadersValidation,
  getRankedStatCategoryValidation,
  getTeamStatsValidation,
} from "../../validation/stats";
import getLeagueLeadersController from "../../controllers/stats/league/getLeagueLeaders";
import getTeamStatsController from "../../controllers/stats/team/getTeamStats.controller";
import gameLogController from "../../controllers/stats/game/gameLog.controller";
import rankedStatCategoryController from "../../controllers/stats/league/rankedStatCategory.controller";

const router: Router = Router();

router.get(
  "/game-log/:leagueId/",
  getGameLogValidation(),
  asyncMiddleware(gameLogController)
);

router.get(
  "/league-leaders/:leagueId/:dataType",
  getLeagueLeadersValidation(),
  asyncMiddleware(getLeagueLeadersController)
);

router.get(
  "/ranked-stats/:leagueId/:dataType",
  getRankedStatCategoryValidation(),
  asyncMiddleware(rankedStatCategoryController)
);

router.get(
  "/team/:leagueId/:teamId",
  getTeamStatsValidation(),
  asyncMiddleware(getTeamStatsController)
);

const statsRouter: Router = router;

// eslint-disable-next-line no-unused-vars
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
});

export default statsRouter;

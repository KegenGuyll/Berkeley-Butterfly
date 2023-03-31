import { param, query } from "express-validator";

const getPlayerValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("rosterId").isNumeric().exists().toInt(),
    query("include_team")
      .isBoolean()
      .withMessage("include_team must be a boolean.")
      .toBoolean()
      .optional(),
    query("include_stats")
      .isBoolean()
      .withMessage("include_stats must be a boolean.")
      .toBoolean()
      .optional(),
  ];
};

const getPlayerByPositionValidation = () => {
  return [
    param("leagueId").isNumeric().exists().toInt(),
    param("teamId").isNumeric().exists().toInt(),
    param("position").isString().exists(),
    query("include_teams")
      .isBoolean()
      .withMessage("include_teams must be a boolean.")
      .toBoolean()
      .optional(),
  ];
};
export { getPlayerValidation, getPlayerByPositionValidation };

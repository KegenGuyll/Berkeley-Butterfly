import { DataType, Position, RankedPlayerStats } from "@/models/stats";
import roundNumber from "./roundNumber";
import ordinalSuffix from "./ordinalSuffix";

const positionToDataType = (position: Position): DataType => {
  if (position === "QB") {
    return DataType.PASSING;
  }

  if (position === "RB" || position === "FB" || position === "HB") {
    return DataType.RUSHING;
  }

  if (position === "WR" || position === "TE") {
    return DataType.RECEIVING;
  }

  if (position === "K" || position === "P") {
    return DataType.PUNTING;
  }

  if (
    position === "LG" ||
    position === "RG" ||
    position === "C" ||
    position === "LT" ||
    position === "RT"
  ) {
    return DataType.NONE;
  }

  return DataType.DEFENSE;
};

const dataTypeToRankedStats = (stats: RankedPlayerStats) => {
  if (stats.dataType === DataType.PASSING) {
    return {
      yds: {
        total: stats.passYds.toLocaleString("en-US"),
        rank: ordinalSuffix(stats.ranking.passYdsPos),
      },
      tds: {
        total: stats.passTDs,
        rank: ordinalSuffix(stats.ranking.passTDsPos),
      },
      ints: {
        total: stats.passInts,
        rank: ordinalSuffix(stats.ranking.passIntsPos),
      },
      qbr: {
        total: roundNumber(stats.passerRating, 1),
        rank: ordinalSuffix(stats.ranking.passerRatingPos),
      },
    };
  }

  if (stats.dataType === DataType.RUSHING) {
    return {
      att: {
        total: stats.rushAtt.toLocaleString("en-US"),
        rank: ordinalSuffix(stats.ranking.rushAttPos),
      },
      yds: {
        total: stats.rushYds,
        rank: ordinalSuffix(stats.ranking.rushYdsPos),
      },
      td: {
        total: stats.rushTDs,
        rank: ordinalSuffix(stats.ranking.rushTDsPos),
      },
      avg: {
        total: roundNumber(stats.rushYdsPerAtt, 1),
        rank: ordinalSuffix(stats.ranking.rushYdsPerAttPos),
      },
    };
  }

  if (stats.dataType === DataType.RECEIVING) {
    return {
      rec: {
        total: stats.recCatches.toLocaleString("en-US"),
        rank: ordinalSuffix(stats.ranking.recCatchesPos),
      },
      yds: {
        total: stats.recYds,
        rank: ordinalSuffix(stats.ranking.recYdsPos),
      },
      td: {
        total: stats.recTDs,
        rank: ordinalSuffix(stats.ranking.recTDsPos),
      },
      avg: {
        total: roundNumber(stats.recYdsPerCatch, 1),
        rank: ordinalSuffix(stats.ranking.recYdsPerCatchPos),
      },
    };
  }

  if (stats.dataType === DataType.DEFENSE) {
    return {
      solo: {
        total: stats.defTotalTackles.toLocaleString("en-US"),
        rank: ordinalSuffix(stats.ranking.defTotalTacklesPos),
      },
      sack: {
        total: stats.defSacks,
        rank: ordinalSuffix(stats.ranking.defSacksPos),
      },
      ff: {
        total: stats.defForcedFum,
        rank: ordinalSuffix(stats.ranking.defForcedFumPos),
      },
      int: {
        total: roundNumber(stats.defInts, 1),
        rank: ordinalSuffix(stats.ranking.defIntsPos),
      },
    };
  }

  if (stats.dataType === DataType.PUNTING) {
    return {
      punts: {
        total: stats.puntAtt.toLocaleString("en-US"),
        rank: ordinalSuffix(stats.ranking.puntAttPos),
      },
      avg: {
        total: stats.puntYdsPerAtt,
        rank: ordinalSuffix(stats.ranking.puntYdsPerAttPos),
      },
      long: {
        total: stats.puntLongest,
        rank: ordinalSuffix(stats.ranking.puntLongestPos),
      },
      in20: {
        total: roundNumber(stats.puntsIn20, 1),
        rank: ordinalSuffix(stats.ranking.puntsIn20Pos),
      },
    };
  }

  if (stats.dataType === DataType.KICKING) {
    return {
      "fg%": {
        total: stats.fGCompPct.toLocaleString("en-US"),
        rank: "-",
      },
      "xp%": {
        total: stats.xPCompPct,
        rank: "-",
      },
      lng: {
        total: stats.fGLongest,
        rank: ordinalSuffix(stats.ranking.fGLongestPos),
      },
    };
  }

  return {};
};

export { positionToDataType, dataTypeToRankedStats };

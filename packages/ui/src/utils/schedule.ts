const isHome = (homeTeamId: number, teamId: number) => {
  if (homeTeamId === Number(teamId)) return true;

  return false;
};

const isWin = (
  homeTeamId: number,
  teamId: number,
  homeScore: number,
  awayScore: number
) => {
  if (isHome(homeTeamId, teamId)) {
    if (homeScore > awayScore) {
      return true;
    }
  } else if (homeScore < awayScore) {
    return true;
  }

  return false;
};

export { isHome, isWin };

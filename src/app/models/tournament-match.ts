export class TournamentMatch {
  type: 'NONE' | 'SENDOU_Q' | 'TOURNAMENT' = 'NONE';

  matchUrl: string | undefined;

  tournamentName: string | undefined;
  tournamentImageUrl: string | undefined;

  bracketName: string | undefined;
  roundName: string | undefined;
  winCondition: string | undefined;

  ownTeamName: string | undefined;
  ownTeamImageUrl: string | undefined;
  ownTeamSeed: number | undefined;
  ownScore: number | undefined;

  opponentTeamName: string | undefined;
  opponentTeamImageUrl: string | undefined;
  opponentTeamSeed: number | undefined;
  opponentScore: number | undefined;
}

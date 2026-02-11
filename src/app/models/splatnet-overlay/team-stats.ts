import {TeamResult} from './team-result';

export class TeamStats {
  own_team: TeamResult;
  opp_1: TeamResult;
  opp_2: TeamResult | undefined;
}

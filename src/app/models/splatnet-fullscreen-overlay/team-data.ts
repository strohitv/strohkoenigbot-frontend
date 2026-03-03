import {PlayerData} from './player-data';

export class TeamData {
  result: 'WIN' | 'LOSE' | 'SUPPORT';
  result_str: string;
  color: string;

  players: PlayerData[];
}

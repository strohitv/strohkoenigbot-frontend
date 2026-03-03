import {KeyWinDefeatRate} from './key-win-defeat-rate';

export class WeaponInfo {
  name: string;

  image: string;

  stats: KeyWinDefeatRate[];

  game_count: number;

  stars: number;

  exp_change: number | undefined;
  exp_now: number | undefined;

  exp_start_ratio: number | undefined;
  exp_change_ratio: number | undefined;
  exp_left_ratio: number | undefined;
}

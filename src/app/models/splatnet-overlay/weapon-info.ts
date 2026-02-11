export class WeaponInfo {
  image: string;
  sub_weapon_image: string;
  special_weapon_image: string;

  wins: number;
  stars: number;

  exp_start: number | undefined;
  exp_change: number | undefined;
  exp_now: number | undefined;

  exp_start_ratio: number | undefined;
  exp_change_ratio: number | undefined;
  exp_left_ratio: number | undefined;
}

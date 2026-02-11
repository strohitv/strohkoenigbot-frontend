import {WeaponInfo} from './weapon-info';
import {AbilitiesInfo} from './abilities-info';
import {TeamStats} from './team-stats';
import {StreamStats} from './stream-stats';
import {GameStats} from './game-stats';
import {SpecialStats} from './special-stats';
import {PowerStats} from './power-stats';

export class StreamData {
  type: 'NONE' | 'STATS';

  weapon_info: WeaponInfo | undefined;
  abilities_info: AbilitiesInfo | undefined;

  team_stats: TeamStats | undefined;
  stream_stats: StreamStats | undefined;
  game_stats: GameStats | undefined;
  special_stats: SpecialStats | undefined;
  power_stats: PowerStats | undefined;
}

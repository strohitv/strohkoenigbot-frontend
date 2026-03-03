import {WeaponInfo} from './weapon-info';
import {ClothingData} from './clothing-data';
import {GameData} from './game-data';
import {MapData} from './map-data';
import {GeneralStats} from './general-stats';

export class OverlayData {
  type: 'NONE' | 'VS' | 'SR';

  last_game_end_time: number | undefined;

  // todo wenn vs
  general: GeneralStats | undefined;
  weapon: WeaponInfo | undefined;
  clothing: ClothingData | undefined;
  game: GameData | undefined;
  map_stats: MapData[] | undefined;

  // todo wenn sr
}

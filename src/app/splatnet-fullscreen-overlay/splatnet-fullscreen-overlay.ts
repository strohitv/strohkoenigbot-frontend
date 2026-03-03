import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {OverlayData} from '../models/splatnet-fullscreen-overlay/overlay-data';
import {interval, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import equal from 'fast-deep-equal';
import {DatePipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-splatnet-fullscreen-overlay',
  imports: [
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './splatnet-fullscreen-overlay.html',
  styleUrl: './splatnet-fullscreen-overlay.css',
})
export class SplatnetFullscreenOverlay implements OnDestroy {
  protected model: OverlayData = {
    type: "NONE",
    last_game_end_time: undefined,
    general: undefined,
    weapon: undefined,
    clothing: undefined,
    game: undefined,
    map_stats: undefined
  };

  private reloadDataSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
    const requestLink = '/api/v1/stream-stats-full';

    this.http
      .get<OverlayData>(requestLink)
      .subscribe(response => {
        this.model = response;

        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });

    this.reloadDataSubscription = interval(5_000).subscribe(
      _ => {
        this.http
          .get<OverlayData>(requestLink)
          .subscribe(response => {
            if (!equal(this.model, response)) {
              this.model = response;

              this.cdr.markForCheck();
              this.cdr.detectChanges();
            }
          });
      }
    );
  }

  ngOnDestroy() {
    this.reloadDataSubscription?.unsubscribe();
  }

  // model: OverlayData = {
  //   type: 'NONE',
  //   clothing: undefined,
  //   game: undefined,
  //   general: undefined,
  //   mapStats: undefined,
  //   weapon: undefined
  // }

  // model: OverlayData = {
  //   type: "VS",
  //   last_game_end_time: (20 * 3600 + 33 * 60 + 17) * 1000,
  //   general: {
  //     wins: 43,
  //     defeats: 17,
  //     special_weapon_image: "https://cdn.wikimg.net/en/splatoonwiki/images/7/72/S3_Badge_Trizooka_1200.png?20220918134257",
  //     special_wins: 1200,
  //     special_wins_gained: undefined,
  //     anarchy_rank: "S+30",
  //     weapon_power: undefined,
  //     x_zones: 2225.6,
  //     x_tower: 1980.0,
  //     x_rain: undefined,
  //     x_clams: 2500.9
  //   },
  //   weapon: {
  //     name: "Carbon Roller Deco",
  //     image: "https://sendou.ink/static-assets/img/main-weapons-outlined-2/1001.avif",
  //     stars: 8,
  //     game_count: 1487,
  //     stats: [
  //       {
  //         'key': 'TW',
  //         win_defeat_rate: {
  //           wins: 400,
  //           wins_gained: 13,
  //           defeats: 200,
  //           defeats_gained: 10,
  //           winrate: 66.6
  //         }
  //       },
  //       {
  //         'key': 'Series',
  //         win_defeat_rate: {
  //           wins: 300,
  //           wins_gained: 5,
  //           defeats: 100,
  //           defeats_gained: 0,
  //           winrate: 75
  //         }
  //       },
  //       {
  //         'key': 'Open',
  //         win_defeat_rate: {
  //           wins: 500,
  //           wins_gained: 0,
  //           defeats: 100,
  //           defeats_gained: 0,
  //           winrate: 83.3
  //         }
  //       },
  //       {
  //         'key': 'X Battle',
  //         win_defeat_rate: {
  //           wins: 100,
  //           wins_gained: 20,
  //           defeats: 50,
  //           defeats_gained: 5,
  //           winrate: 66.6
  //         }
  //       }],
  //     exp_change: 50000,
  //     exp_now: 1550000,
  //     exp_start_ratio: 40.0,
  //     exp_change_ratio: 5.0,
  //     exp_left_ratio: 55.0
  //   },
  //   clothing: {
  //     head: {
  //       name: "Pearlescent Crown",
  //       image:
  //         "https://sendou.ink/static-assets/img/gear/head/25006.avif",
  //       stars:
  //         5,
  //       game_count: 1400,
  //       main_image:
  //         "https://sendou.ink/static-assets/img/abilities/CB.avif",
  //       sub_1_image:
  //         "https://sendou.ink/static-assets/img/abilities/SRU.avif",
  //       sub_2_image:
  //         "https://sendou.ink/static-assets/img/abilities/RES.avif",
  //       sub_3_image:
  //         "https://sendou.ink/static-assets/img/abilities/QSJ.avif"
  //     }
  //     ,
  //     shirt: {
  //       name: "Rockenberg Black",
  //       image:
  //         "https://sendou.ink/static-assets/img/gear/clothes/1005.avif",
  //       stars:
  //         5,
  //       game_count: 50,
  //       main_image:
  //         "https://sendou.ink/static-assets/img/abilities/NS.avif",
  //       sub_1_image:
  //         "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //       sub_2_image:
  //         "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //       sub_3_image:
  //         "https://sendou.ink/static-assets/img/abilities/QSJ.avif"
  //     }
  //     ,
  //     shoes: {
  //       name: "Suede Bosses",
  //       image:
  //         "https://sendou.ink/static-assets/img/gear/shoes/1024.avif",
  //       stars:
  //         5,
  //       game_count: 180,
  //       main_image:
  //         "https://sendou.ink/static-assets/img/abilities/SJ.avif",
  //       sub_1_image:
  //         "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //       sub_2_image:
  //         "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //       sub_3_image:
  //         "https://sendou.ink/static-assets/img/abilities/ISS.avif"
  //     }
  //   }
  //   ,
  //   game: {
  //     teams:
  //       [
  //         {
  //           result: 'WIN',
  //           result_str: "56p",
  //           color: "#c12d74",
  //           players: [
  //             {
  //               name: "stroh",
  //               is_myself: true,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/1001.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/1.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/2.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/CB.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/NS.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/SJ.avif",
  //               kills: 15,
  //               assists: 5,
  //               deaths: 12,
  //               specials: 3,
  //               paint: 1_000,
  //               number_of_games: 0
  //             },
  //             {
  //               name: "VA Tent",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/6020.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/13.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/10.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/SCU.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/RSU.avif",
  //               kills: 10,
  //               assists: 3,
  //               deaths: 7,
  //               specials: 5,
  //               paint: 1_500,
  //               number_of_games: 4475
  //             },
  //             {
  //               name: "Someone",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/2070.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/15.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/3.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/SCU.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/ISM.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/ISM.avif",
  //               kills: 6,
  //               assists: 10,
  //               deaths: 0,
  //               specials: 8,
  //               paint: 2_000,
  //               number_of_games: 34
  //             },
  //             {
  //               name: "Kiver",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/50.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/9.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/4.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/SJ.avif",
  //               kills: 9,
  //               assists: 7,
  //               deaths: 5,
  //               specials: 3,
  //               paint: 780,
  //               number_of_games: 13
  //             }
  //           ]
  //         },
  //         {
  //           result: "LOSE",
  //           result_str: "44p",
  //           color: "#2cb721",
  //           players: [
  //             {
  //               name: "Opponent 1",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/4010.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/7.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/3.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/RSU.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/RSU.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/OS.avif",
  //               kills: 10,
  //               assists: 2,
  //               deaths: 8,
  //               specials: 5,
  //               paint: 1_750,
  //               number_of_games: 1
  //             },
  //             {
  //               name: "Opponent 2",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/3001.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/3.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/12.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/CB.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/QR.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/SJ.avif",
  //               kills: 3,
  //               assists: 0,
  //               deaths: 12,
  //               specials: 1,
  //               paint: 530,
  //               number_of_games: 45
  //             },
  //             {
  //               name: "Opponent 3",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/1110.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/3.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/1.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/NS.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/DR.avif",
  //               kills: 17,
  //               assists: 4,
  //               deaths: 8,
  //               specials: 4,
  //               paint: 1_200,
  //               number_of_games: 435
  //             },
  //             {
  //               name: "Opponent 4",
  //               is_myself: false,
  //               weapon_image: "https://sendou.ink/static-assets/img/main-weapons/8020.avif",
  //               special_weapon_image: "https://sendou.ink/static-assets/img/special-weapons/2.avif",
  //               sub_weapon_image: "https://sendou.ink/static-assets/img/sub-weapons/1.avif",
  //               head_main_image: "https://sendou.ink/static-assets/img/abilities/CB.avif",
  //               shirt_main_image: "https://sendou.ink/static-assets/img/abilities/SSU.avif",
  //               shoes_main_image: "https://sendou.ink/static-assets/img/abilities/SJ.avif",
  //               kills: 8,
  //               assists: 8,
  //               deaths: 6,
  //               specials: 3,
  //               paint: 1_178,
  //               number_of_games: 78
  //             }
  //           ]
  //         }
  //       ]
  //   }
  //   ,
  //   map_stats: [
  //     {
  //       name: "Brinewater Springs",
  //       image: "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/f/fc/S3_Stage_Brinewater_Springs.png/450px-S3_Stage_Brinewater_Springs.png",
  //       stats: [{
  //         'key': 'TW', win_defeat_rate: {
  //           wins: 400
  //           ,
  //           wins_gained: 13
  //           ,
  //           defeats: 200
  //           ,
  //           defeats_gained: 10
  //           ,
  //           winrate: 66.6
  //         }
  //       },
  //         {
  //           'key': 'Series'
  //           ,
  //           win_defeat_rate: {
  //             wins: 300,
  //             wins_gained: 5,
  //             defeats: 100,
  //             defeats_gained: 0,
  //             winrate: 75
  //           }
  //         },
  //         {
  //           'key': 'Open',
  //           win_defeat_rate: {
  //             wins: 500,
  //             wins_gained: 0,
  //             defeats: 100,
  //             defeats_gained: 0,
  //             winrate: 83.3
  //           }
  //         },
  //         {
  //           'key': 'X Battle',
  //           win_defeat_rate: {
  //             wins: 100,
  //             wins_gained: 20,
  //             defeats: 50,
  //             defeats_gained: 5,
  //             winrate: 66.6
  //           }
  //         }]
  //       ,
  //     }
  //
  //     ,
  //     {
  //       name: "MakoMart",
  //       image:
  //         "https://cdn.wikimg.net/en/splatoonwiki/images/thumb/6/6b/S3_Stage_MakoMart.jpg/450px-S3_Stage_MakoMart.jpg",
  //       stats:
  //         [{
  //           'key': 'TW', win_defeat_rate: {
  //             wins: 400,
  //             wins_gained: 13,
  //             defeats: 200,
  //             defeats_gained: 10,
  //             winrate: 66.6
  //           }
  //         },
  //           {
  //             'key': 'Series', win_defeat_rate: {
  //               wins: 300,
  //               wins_gained: 5,
  //               defeats: 100,
  //               defeats_gained: 0,
  //               winrate: 75
  //             }
  //           },
  //           {
  //             'key': 'Open', win_defeat_rate: {
  //               wins: 500,
  //               wins_gained: 0,
  //               defeats: 100,
  //               defeats_gained: 0,
  //               winrate: 83.3
  //             }
  //           },
  //           {
  //             'key': 'X Battle', win_defeat_rate: {
  //               wins: 100,
  //               wins_gained: 20,
  //               defeats: 50,
  //               defeats_gained: 5,
  //               winrate: 66.6
  //             }
  //           }]
  //     }
  //   ]
  // }
}

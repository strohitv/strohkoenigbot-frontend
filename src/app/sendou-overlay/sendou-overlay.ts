import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TournamentMatch} from '../models/tournament-match';

@Component({
  selector: 'app-sendou-overlay',
  templateUrl: './sendou-overlay.html',
  styleUrl: './sendou-overlay.css',
})
export class SendouOverlay implements OnDestroy {
  protected emptyTeamImageUrl: string = 'https://sendou.ink/static-assets/img/abilities/UNKNOWN.avif'

  protected model: TournamentMatch = new TournamentMatch();

  private subscription: Subscription;

  private sendouUserId: string;
  private tournamentId: string;

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.sendouUserId = params['suid'] ?? '6238';
      this.tournamentId = params['toid'] ?? '2978';
    });

    this.http
      .get<TournamentMatch>(this.createGetRequestLink())
      .subscribe(response => {
        this.model = response;
        this.cdr.detectChanges();
      });

    const source = interval(10_000);
    this.subscription = source.subscribe(
      _ => {
        this.http
          .get<TournamentMatch>(this.createGetRequestLink())
          .subscribe(response => {
            this.model = response;
            this.cdr.detectChanges();
          });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private createGetRequestLink(): string {
    return `/api/v1/sendou/match/search?tournament_id=${this.tournamentId}&user_id=${this.sendouUserId}`;
  }
}

import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TournamentMatch} from '../models/tournament-match';
import {QRCodeComponent} from 'angularx-qrcode';

@Component({
  selector: 'app-sendou-overlay',
  templateUrl: './sendou-overlay.html',
  styleUrl: './sendou-overlay.css',
  imports: [
    QRCodeComponent
  ]
})
export class SendouOverlay implements OnDestroy {
  protected emptyTeamImageUrl: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=)'

  protected model: TournamentMatch = new TournamentMatch();
  protected matchUrlMode: 'NONE' | 'QR' | 'URL' | 'BOTH' = 'QR';

  private subscription: Subscription;

  private sendouUser: string;
  private tournamentId: string;

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.sendouUser = params['user'] ?? 'strohkoenig';
      this.tournamentId = params['toid'] ?? '2978';

      if (params['url']) {
        if (params['url'].toUpperCase() === 'NONE') {
          console.log(params['url']);
          this.matchUrlMode = 'NONE';
        } else if (params['url'].toUpperCase() === 'URL') {
          console.log(params['url']);
          this.matchUrlMode = 'URL';
        } else if (params['url'].toUpperCase() === 'BOTH') {
          console.log(params['url']);
          this.matchUrlMode = 'BOTH';
        }
      }
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
    this.subscription?.unsubscribe();
  }

  private createGetRequestLink(): string {
    return `/api/v1/sendou/match/search?tournament_id=${this.tournamentId}&user=${this.sendouUser}`;
  }
}

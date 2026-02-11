import {
  ChangeDetectorRef,
  Component, afterEveryRender,
  OnDestroy,
  SimpleChanges, OnChanges
} from '@angular/core';
import {StreamData} from '../models/splatnet-overlay/stream-data';
import {HttpClient} from '@angular/common/http';
import {interval, Subscription} from 'rxjs';
import equal from 'fast-deep-equal';

@Component({
  selector: 'app-splatnet-sidebar-overlay',
  imports: [],
  templateUrl: './splatnet-sidebar-overlay.html',
  styleUrl: './splatnet-sidebar-overlay.css',
})
export class SplatnetSidebarOverlay implements OnDestroy, OnChanges {
  protected model: StreamData = new StreamData();
  private reloadStatsSubscription: Subscription;
  private switchTabSubscription: Subscription;
  protected numberOfTabs = 1;
  private currentActiveTab = 0;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {
    const requestLink = 'http://localhost:8080/api/v1/stream-stats';

    this.http
      .get<StreamData>(requestLink)
      .subscribe(response => {
        this.model = response;

        this.numberOfTabs = this.model.power_stats ? 6 : 5;

        this.cdr.markForCheck();
        this.cdr.detectChanges();
      });

    this.reloadStatsSubscription = interval(10_000).subscribe(
      _ => {
        this.http
          .get<StreamData>(requestLink)
          .subscribe(response => {
            if (!equal(this.model, response)) {
              this.model = response;

              this.numberOfTabs = this.model.power_stats ? 6 : 5;

              this.cdr.markForCheck();
              this.cdr.detectChanges();
            }
          });
      }
    );

    afterEveryRender({
      read: () => {
        this.switchTabSubscription?.unsubscribe();

        const allTabs = document.getElementsByClassName('tab');
        this.currentActiveTab = 0;
        for (let tab of allTabs) {
          tab.classList.add('hidden')
        }
        if (allTabs.length > 0) {
          allTabs[0].classList.remove('hidden');
        }

        const allNavigators = document.getElementsByClassName('navigator');
        for (let navigator of allNavigators) {
          navigator.classList.remove('active-navigator')
        }
        if (allNavigators.length > 0) {
          allNavigators[0].classList.add('active-navigator');
        }

        this.switchTabSubscription = interval(7_500).subscribe(_ => {
          const allTabs = document.getElementsByClassName('tab');
          this.currentActiveTab = ((this.currentActiveTab + 1) % allTabs.length);

          for (let tab of allTabs) {
            tab.classList.add('hidden')
          }
          allTabs[this.currentActiveTab].classList.remove('hidden');

          for (let navigator of document.getElementsByClassName('active-navigator')) {
            navigator.classList.remove('active-navigator')
          }
          document.getElementsByClassName('navigator')[this.currentActiveTab].classList.add('active-navigator');
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log('ngOnChanges');
  }

  ngOnDestroy() {
    this.reloadStatsSubscription?.unsubscribe();
    this.switchTabSubscription?.unsubscribe();
  }

  protected readonly Math = Math;
}

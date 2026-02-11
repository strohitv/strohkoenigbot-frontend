import { Routes } from '@angular/router';
import {SendouOverlay} from './sendou-overlay/sendou-overlay';
import {SplatnetSidebarOverlay} from './splatnet-sidebar-overlay/splatnet-sidebar-overlay';
import {CombinedOverlay} from './combined-overlay/combined-overlay';

export const routes: Routes = [
  {
    path: 'sendou',
    component: SendouOverlay
  },
  {
    path: 'stats-sidebar',
    component: SplatnetSidebarOverlay
  },
  {
    path: 'combined',
    component: CombinedOverlay
  }
];

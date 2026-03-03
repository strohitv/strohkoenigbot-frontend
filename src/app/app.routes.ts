import { Routes } from '@angular/router';
import {SendouOverlay} from './sendou-overlay/sendou-overlay';
import {SplatnetSidebarOverlay} from './splatnet-sidebar-overlay/splatnet-sidebar-overlay';
import {CombinedOverlay} from './combined-overlay/combined-overlay';
import {SplatnetFullscreenOverlay} from './splatnet-fullscreen-overlay/splatnet-fullscreen-overlay';

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
    path: 'stats-fullscreen',
    component: SplatnetFullscreenOverlay
  },
  {
    path: 'combined',
    component: CombinedOverlay
  }
];

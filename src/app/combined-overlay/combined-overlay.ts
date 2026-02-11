import { Component } from '@angular/core';
import {SendouOverlay} from '../sendou-overlay/sendou-overlay';
import {SplatnetSidebarOverlay} from '../splatnet-sidebar-overlay/splatnet-sidebar-overlay';

@Component({
  selector: 'app-combined-overlay',
  imports: [
    SendouOverlay,
    SplatnetSidebarOverlay
  ],
  templateUrl: './combined-overlay.html',
  styleUrl: './combined-overlay.css',
})
export class CombinedOverlay {

}

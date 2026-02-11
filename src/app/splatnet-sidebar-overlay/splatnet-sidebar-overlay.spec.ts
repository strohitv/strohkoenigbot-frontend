import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplatnetSidebarOverlay } from './splatnet-sidebar-overlay';

describe('SplatnetSidebarOverlay', () => {
  let component: SplatnetSidebarOverlay;
  let fixture: ComponentFixture<SplatnetSidebarOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplatnetSidebarOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplatnetSidebarOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

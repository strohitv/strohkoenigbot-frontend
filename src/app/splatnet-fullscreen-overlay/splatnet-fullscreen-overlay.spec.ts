import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplatnetFullscreenOverlay } from './splatnet-fullscreen-overlay';

describe('SplatnetFullscreenOverlay', () => {
  let component: SplatnetFullscreenOverlay;
  let fixture: ComponentFixture<SplatnetFullscreenOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplatnetFullscreenOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplatnetFullscreenOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

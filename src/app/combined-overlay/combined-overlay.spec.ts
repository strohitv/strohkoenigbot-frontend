import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedOverlay } from './combined-overlay';

describe('CombinedOverlay', () => {
  let component: CombinedOverlay;
  let fixture: ComponentFixture<CombinedOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinedOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendouOverlay } from './sendou-overlay';

describe('SendouOverlay', () => {
  let component: SendouOverlay;
  let fixture: ComponentFixture<SendouOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendouOverlay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendouOverlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

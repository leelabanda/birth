import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MEvents } from './m-events';

describe('MEvents', () => {
  let component: MEvents;
  let fixture: ComponentFixture<MEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MEvents],
    }).compileComponents();

    fixture = TestBed.createComponent(MEvents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

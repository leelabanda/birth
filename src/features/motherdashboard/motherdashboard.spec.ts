import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Motherdashboard } from './motherdashboard';

describe('Motherdashboard', () => {
  let component: Motherdashboard;
  let fixture: ComponentFixture<Motherdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Motherdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Motherdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

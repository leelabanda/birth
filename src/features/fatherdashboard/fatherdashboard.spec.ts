import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fatherdashboard } from './fatherdashboard';

describe('Fatherdashboard', () => {
  let component: Fatherdashboard;
  let fixture: ComponentFixture<Fatherdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fatherdashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Fatherdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

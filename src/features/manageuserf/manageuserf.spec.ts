import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Manageuserf } from './manageuserf';

describe('Manageuserf', () => {
  let component: Manageuserf;
  let fixture: ComponentFixture<Manageuserf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manageuserf],
    }).compileComponents();

    fixture = TestBed.createComponent(Manageuserf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

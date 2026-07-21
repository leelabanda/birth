import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anniversary } from './anniversary';

describe('Anniversary', () => {
  let component: Anniversary;
  let fixture: ComponentFixture<Anniversary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anniversary],
    }).compileComponents();

    fixture = TestBed.createComponent(Anniversary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

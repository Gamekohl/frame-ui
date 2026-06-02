import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Installation } from './installation';

describe('Installation', () => {
  let component: Installation;
  let fixture: ComponentFixture<Installation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Installation],
    }).compileComponents();

    fixture = TestBed.createComponent(Installation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

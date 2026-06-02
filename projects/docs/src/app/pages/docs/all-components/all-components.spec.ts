import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllComponents } from './all-components';

describe('AllComponents', () => {
  let component: AllComponents;
  let fixture: ComponentFixture<AllComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(AllComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

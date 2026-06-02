import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeTokens } from './theme-tokens';

describe('ThemeTokens', () => {
  let component: ThemeTokens;
  let fixture: ComponentFixture<ThemeTokens>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeTokens],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeTokens);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMangement } from './hero-mangement';

describe('HeroMangement', () => {
  let component: HeroMangement;
  let fixture: ComponentFixture<HeroMangement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroMangement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroMangement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

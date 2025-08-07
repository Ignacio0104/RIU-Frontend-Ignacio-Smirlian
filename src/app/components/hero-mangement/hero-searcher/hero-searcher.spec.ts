import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearcher } from './hero-searcher';

describe('HeroSearcher', () => {
  let component: HeroSearcher;
  let fixture: ComponentFixture<HeroSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSearcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInformation } from './hero-information';

describe('HeroInformation', () => {
  let component: HeroInformation;
  let fixture: ComponentFixture<HeroInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

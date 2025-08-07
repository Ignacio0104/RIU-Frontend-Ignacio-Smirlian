import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCard } from './hero-card';
import { NextOrPrevious, UniverseEnum } from '../../../models/hero-models';

describe('HeroCard', () => {
  let component: HeroCard;
  let fixture: ComponentFixture<HeroCard>;

  const mockHero = {
    id: '1',
    name: 'Spider-Man',
    alterEgo: 'Peter Parker',
    power: 10,
    universe: UniverseEnum.MARVEL,
    pictureUrl: 'spider-man.jpg',
    description: 'Friendly neighborhood Spider-Man.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCard],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('selectedHero', mockHero);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the changeHero event with the correct action', () => {
    const emitSpy = spyOn(component.changeHero, 'emit');

    component.emitChangeHero(NextOrPrevious.NEXT);

    expect(emitSpy).toHaveBeenCalledWith(NextOrPrevious.NEXT);
  });

  it('should emit the editHero event with true', () => {
    const emitSpy = spyOn(component.editHero, 'emit');

    component.emitEditHero();

    expect(emitSpy).toHaveBeenCalledWith(true);
  });
});

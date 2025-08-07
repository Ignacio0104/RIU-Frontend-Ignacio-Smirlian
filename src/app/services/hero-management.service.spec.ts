import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroManagementSerivce } from './hero-management.service';
import { AppStatusService } from './app-status.service';
import { Hero, NextOrPrevious, UniverseEnum } from '../models/hero-models';

describe('HeroManagementSerivce', () => {
  let service: HeroManagementSerivce;
  let mockAppStatusService: any;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      name: 'Hero A',
      alterEgo: 'A',
      power: 10,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    },
    {
      id: '2',
      name: 'Hero B',
      alterEgo: 'B',
      power: 20,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    },
    {
      id: '3',
      name: 'Hero C',
      alterEgo: 'C',
      power: 30,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    },
  ];

  beforeEach(() => {
    mockAppStatusService = {
      updateLoadingStatus: jasmine.createSpy('updateLoadingStatus'),
    };

    TestBed.configureTestingModule({
      providers: [
        HeroManagementSerivce,
        { provide: AppStatusService, useValue: mockAppStatusService },
      ],
    });

    service = TestBed.inject(HeroManagementSerivce);
    (service as any)._heroesList.set(mockHeroes);
    (service as any)._selectedHero.set(mockHeroes[0]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update selected hero to the next hero in the list', () => {
    service.updateSelectedHeroByIndex(NextOrPrevious.NEXT);
    expect(service.selectedHero()).toEqual(mockHeroes[1]);
  });

  it('should update selected hero to the previous hero in the list', () => {
    (service as any)._selectedHero.set(mockHeroes[1]);
    service.updateSelectedHeroByIndex(NextOrPrevious.PREVIOUS);
    expect(service.selectedHero()).toEqual(mockHeroes[0]);
  });

  it('should not update selected hero if next is out of bounds', () => {
    (service as any)._selectedHero.set(mockHeroes[2]);
    const currentHero = service.selectedHero();
    service.updateSelectedHeroByIndex(NextOrPrevious.NEXT);
    expect(service.selectedHero()).toEqual(currentHero);
  });

  it('should not update selected hero if previous is out of bounds', () => {
    (service as any)._selectedHero.set(mockHeroes[0]);
    const currentHero = service.selectedHero();
    service.updateSelectedHeroByIndex(NextOrPrevious.PREVIOUS);
    expect(service.selectedHero()).toEqual(currentHero);
  });

  it('should update selected hero by id', () => {
    service.updateSelectedHeroById('2');
    expect(service.selectedHero()).toEqual(mockHeroes[1]);
  });

  it('should return a hero by id after a delay', fakeAsync(() => {
    let result: Hero | undefined;
    service.getHeroById('2').then((hero) => (result = hero));
    expect(mockAppStatusService.updateLoadingStatus).toHaveBeenCalledWith(true);
    tick(2000);
    expect(mockAppStatusService.updateLoadingStatus).toHaveBeenCalledWith(
      false
    );
    expect(result).toEqual(mockHeroes[1]);
  }));

  it('should edit a hero after a delay and update the hero list', fakeAsync(() => {
    const editedHero = { ...mockHeroes[0], name: 'Edited Hero' };
    service.editHero(editedHero);
    expect(mockAppStatusService.updateLoadingStatus).toHaveBeenCalledWith(true);
    tick(3000);
    expect(mockAppStatusService.updateLoadingStatus).toHaveBeenCalledWith(
      false
    );
    expect(service.heroesList()[0].name).toBe('Edited Hero');
  }));

  it('should add a new hero after a delay and update the hero list', fakeAsync(() => {
    const newHero: Hero = {
      id: 'testId',
      name: 'New Hero',
      alterEgo: 'N',
      power: 40,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    };
    const initialCount = service.heroesList().length;
    service.addNewHero(newHero);
    tick(3000);
    expect(service.heroesList().length).toBe(initialCount + 1);
    expect(service.heroesList()[0].name).toBe('New Hero');
  }));

  it('should remove a hero from the list', () => {
    service.removeHero('2');
    expect(service.heroesList().length).toBe(2);
    expect(service.heroesList().find((h) => h.id === '2')).toBeUndefined();
  });

  it('should set selectedHero to null if removed hero is the selected one', () => {
    (service as any)._selectedHero.set(mockHeroes[0]);
    service.removeHero('1');
    expect(service.selectedHero()).toBeNull();
  });
});

import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { HeroManagementSerivce } from './hero-management.service';
import { Hero, UniverseEnum } from '../models/hero-models';
import { signal } from '@angular/core';

describe('TableService', () => {
  let service: TableService;
  let mockHeroManagementSvc: any;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      name: 'Superman',
      alterEgo: 'Clark Kent',
      power: 100,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url1',
      description: 'desc1',
    },
    {
      id: '2',
      name: 'Batman',
      alterEgo: 'Bruce Wayne',
      power: 80,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url2',
      description: 'desc2',
    },
    {
      id: '3',
      name: 'Spider-Man',
      alterEgo: 'Peter Parker',
      power: 70,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url3',
      description: 'desc3',
    },
    {
      id: '4',
      name: 'Iron Man',
      alterEgo: 'Tony Stark',
      power: 90,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url4',
      description: 'desc4',
    },
    {
      id: '5',
      name: 'Wonder Woman',
      alterEgo: 'Diana Prince',
      power: 95,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url5',
      description: 'desc5',
    },
    {
      id: '6',
      name: 'Thor',
      alterEgo: 'Thor Odinson',
      power: 100,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url6',
      description: 'desc6',
    },
    {
      id: '7',
      name: 'Captain America',
      alterEgo: 'Steve Rogers',
      power: 60,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url7',
      description: 'desc7',
    },
    {
      id: '8',
      name: 'Flash',
      alterEgo: 'Barry Allen',
      power: 100,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url8',
      description: 'desc8',
    },
    {
      id: '9',
      name: 'Hulk',
      alterEgo: 'Bruce Banner',
      power: 120,
      universe: UniverseEnum.MARVEL,
      pictureUrl: 'url9',
      description: 'desc9',
    },
  ];

  beforeEach(() => {
    mockHeroManagementSvc = {
      heroesList: signal(mockHeroes),
    };

    TestBed.configureTestingModule({
      providers: [
        TableService,
        { provide: HeroManagementSerivce, useValue: mockHeroManagementSvc },
      ],
    });

    service = TestBed.inject(TableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with correct pages and heroes', () => {
    const pagesInfo = service.pagesInformation();
    expect(pagesInfo.numberOfPages).toBe(2);
    expect(pagesInfo.currentPage).toBe(1);
    expect(pagesInfo.existPrevPage).toBeFalse();
    expect(pagesInfo.existsNextPage).toBeTrue();
    expect(service.currentPageInformation().length).toBe(6);
  });

  it('should return correct column names', () => {
    const columns = service.getColumns();
    expect(columns).toEqual(['id', 'name', 'alterEgo', 'power', 'universe']);
  });

  it('should filter heroes and update pages information correctly', () => {
    service.getPaginatedHeroes(undefined, 'man');
    const currentPage = service.currentPageInformation();
    const pagesInfo = service.pagesInformation();
    expect(currentPage.length).toBe(5);
    expect(
      currentPage.every((hero) => hero.name.toLowerCase().includes('man'))
    ).toBeTrue();
    expect(pagesInfo.numberOfPages).toBe(1);
    expect(pagesInfo.existsNextPage).toBeFalse();
  });

  it('should get heroes for a specific page number', () => {
    service.getPaginatedHeroes(2);
    const currentPage = service.currentPageInformation();
    const pagesInfo = service.pagesInformation();
    expect(currentPage.length).toBe(3);
    expect(currentPage[0].id).toBe('7');
    expect(pagesInfo.currentPage).toBe(2);
    expect(pagesInfo.existPrevPage).toBeTrue();
    expect(pagesInfo.existsNextPage).toBeFalse();
  });

  it('should reset to first page when pageNumber is undefined on a new pagination call', () => {
    service.getPaginatedHeroes(2);
    expect(service.pagesInformation().currentPage).toBe(2);
    service.getPaginatedHeroes(undefined, 'a');
    expect(service.pagesInformation().currentPage).toBe(1);
  });
});

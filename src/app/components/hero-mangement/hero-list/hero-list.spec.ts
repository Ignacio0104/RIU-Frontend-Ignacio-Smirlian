import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroList } from './hero-list';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { Pages, TableService } from '../../../services/table.service';
import { signal } from '@angular/core';
import {
  Hero,
  NextOrPrevious,
  UniverseEnum,
} from '../../../models/hero-models';

describe('HeroList', () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let mockHeroService: any;
  let mockTableService: any;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      name: 'Superman',
      alterEgo: 'Clark Kent',
      power: 100,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    },
    {
      id: '2',
      name: 'Batman',
      alterEgo: 'Bruce Wayne',
      power: 80,
      universe: UniverseEnum.DC,
      pictureUrl: '',
      description: '',
    },
  ];

  const mockPages: Pages = {
    currentPage: 1,
    numberOfPages: 5,
    existPrevPage: false,
    existsNextPage: false,
  };

  beforeEach(async () => {
    mockHeroService = {
      updateSelectedHeroById: jasmine.createSpy('updateSelectedHeroById'),
    };

    mockTableService = {
      currentPageInformation: signal(mockHeroes),
      pagesInformation: signal(mockPages),
      getColumns: () => ['id', 'name', 'alterEgo'],
      getPaginatedHeroes: jasmine.createSpy('getPaginatedHeroes'),
    };

    await TestBed.configureTestingModule({
      imports: [HeroList],
      providers: [
        { provide: HeroManagementSerivce, useValue: mockHeroService },
        { provide: TableService, useValue: mockTableService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columns and heroes on ngOnInit', () => {
    expect(component.columns).toEqual(['id', 'name', 'alterEgo']);
    expect(component.heroesData).toEqual(mockHeroes);
  });

  it('should call updateSelectedHeroById when clickedCell is called with a hero', () => {
    const heroToSelect = mockHeroes[0];
    component.clickedCell(heroToSelect);
    expect(mockHeroService.updateSelectedHeroById).toHaveBeenCalledWith(
      heroToSelect.id
    );
  });

  it('should update filterText and call getPaginatedHeroes on handleFilter', () => {
    const filterValue = 'spider';
    component.handleFilter(filterValue);
    expect(component.filterText).toBe(filterValue);
    expect(mockTableService.getPaginatedHeroes).toHaveBeenCalledWith(
      undefined,
      filterValue
    );
  });

  it('should call getPaginatedHeroes for the next page on handlePagination(NEXT)', () => {
    component.pageInformation = {
      ...mockPages,
      currentPage: 2,
      numberOfPages: 5,
    };
    component.handlePagination(NextOrPrevious.NEXT);
    expect(mockTableService.getPaginatedHeroes).toHaveBeenCalledWith(
      3,
      component.filterText
    );
  });

  it('should call getPaginatedHeroes for the previous page on handlePagination(PREVIOUS)', () => {
    component.pageInformation = {
      ...mockPages,
      currentPage: 2,
      numberOfPages: 5,
    };
    component.handlePagination(NextOrPrevious.PREVIOUS);
    expect(mockTableService.getPaginatedHeroes).toHaveBeenCalledWith(
      1,
      component.filterText
    );
  });
});

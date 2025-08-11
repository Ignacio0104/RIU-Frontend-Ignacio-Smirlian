import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeroSearcher } from './hero-searcher';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { Hero, UniverseEnum } from '../../../models/hero-models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppStatusService } from '../../../services/app-status.service';
import { signal } from '@angular/core';
import { RouterModule } from '@angular/router';

describe('HeroSearcher', () => {
  let component: HeroSearcher;
  let fixture: ComponentFixture<HeroSearcher>;
  let mockHeroService: jasmine.SpyObj<HeroManagementSerivce>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockAppStatusSvc: any;

  const mockHero: Hero = {
    id: '1',
    name: 'Superman',
    alterEgo: 'Clark Kent',
    power: 100,
    universe: UniverseEnum.DC,
    pictureUrl: 'superman.jpg',
    description: 'The Man of Steel',
  };

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroManagementSerivce', [
      'getHeroById',
      'updateSelectedHeroById',
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    mockAppStatusSvc = {
      isLoading: signal(false),
    };

    await TestBed.configureTestingModule({
      imports: [HeroSearcher, RouterModule.forRoot([])],
      providers: [
        { provide: HeroManagementSerivce, useValue: mockHeroService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: AppStatusService, useValue: mockAppStatusSvc },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getHeroById and navigate on successful search', fakeAsync(() => {
    mockHeroService.getHeroById.and.returnValue(Promise.resolve(mockHero));
    component.searchHero('1');
    tick();
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith('1');
    expect(component.heroFound).toEqual(mockHero);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/hero', '1']);
  }));

  it('should show snackbar and not navigate if hero is not found', fakeAsync(() => {
    mockHeroService.getHeroById.and.returnValue(Promise.resolve(undefined));
    component.searchHero('999');
    tick();
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith('999');
    expect(component.heroFound).toBeUndefined();
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Hero not found!',
      '',
      jasmine.any(Object)
    );
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  it('should update isLoading status based on AppStatusService signal', fakeAsync(() => {
    mockAppStatusSvc.isLoading.set(true);
    fixture.detectChanges();
    expect(component.isLoading).toBeTrue();

    mockAppStatusSvc.isLoading.set(false);
    fixture.detectChanges();
    expect(component.isLoading).toBeFalse();
  }));
});

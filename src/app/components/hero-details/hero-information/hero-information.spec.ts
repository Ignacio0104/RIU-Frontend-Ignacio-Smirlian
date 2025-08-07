import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroInformation } from './hero-information';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { Hero, UniverseEnum } from '../../../models/hero-models';

describe('HeroInformation', () => {
  let component: HeroInformation;
  let fixture: ComponentFixture<HeroInformation>;

  let mockActivatedRoute: any;
  let mockRouter: any;
  let mockHeroService: any;

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
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockHeroService = {
      getHeroById: jasmine
        .createSpy('getHeroById')
        .and.returnValue(Promise.resolve(mockHero)),
    };

    await TestBed.configureTestingModule({
      imports: [HeroInformation],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: HeroManagementSerivce, useValue: mockHeroService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a hero on initialization', async () => {
    expect(mockHeroService.getHeroById).toHaveBeenCalledWith('1', 0);

    await fixture.whenStable();
    expect(component.hero).toEqual(mockHero);
  });

  it('should navigate to home if hero is not found', async () => {
    mockHeroService.getHeroById.and.returnValue(Promise.resolve(undefined));
    component.fetchHero();

    await fixture.whenStable();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call router.navigate with "/" when goToHome is called', () => {
    component.goToHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroMangement } from './hero-mangement';
import { HeroManagementSerivce } from '../../services/hero-management.service';
import { TableService } from '../../services/table.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NextOrPrevious } from '../../models/hero-models';
import { signal } from '@angular/core';
import { of } from 'rxjs';

describe('HeroMangement', () => {
  let component: HeroMangement;
  let fixture: ComponentFixture<HeroMangement>;
  let mockHeroService: any;
  let mockTableService: any;
  let mockDialog: any;
  let mockSnackBar: any;

  beforeEach(async () => {
    mockHeroService = {
      selectedHero: signal(null),
      heroesList: signal([]),
      updateSelectedHeroByIndex: jasmine.createSpy('updateSelectedHeroByIndex'),
      removeHero: jasmine.createSpy('removeHero'),
    };

    mockTableService = {
      getPaginatedHeroes: jasmine.createSpy('getPaginatedHeroes'),
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    mockSnackBar = {
      open: jasmine.createSpy('open'),
    };

    await TestBed.configureTestingModule({
      imports: [HeroMangement, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: HeroManagementSerivce, useValue: mockHeroService },
        { provide: TableService, useValue: mockTableService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMangement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateSelectedHeroByIndex on changeSelectedHero', () => {
    component.changeSelectedHero(NextOrPrevious.NEXT);
    expect(mockHeroService.updateSelectedHeroByIndex).toHaveBeenCalledWith(
      NextOrPrevious.NEXT
    );
  });

  it('should call removeHero on onDeleteHero', () => {
    component.onDeleteHero('1');
    expect(mockHeroService.removeHero).toHaveBeenCalledWith('1');
  });

  it('should open a snackbar notification when showConfirmation is called', () => {
    (component as any).showConfirmation('created');
    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Hero created succesfully!',
      '',
      jasmine.any(Object)
    );
  });
});

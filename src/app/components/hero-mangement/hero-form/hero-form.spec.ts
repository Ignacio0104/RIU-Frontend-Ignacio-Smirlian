import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeroForm } from './hero-form';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { AppStatusService } from '../../../services/app-status.service';
import { Hero, UniverseEnum } from '../../../models/hero-models';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;
  let mockHeroService: any;
  let mockAppStatusService: any;
  let mockDialogRef: any;
  let mockDialog: any;

  const mockHero: Hero = {
    id: '1',
    name: 'Spider-Man',
    alterEgo: 'Peter Parker',
    power: 10,
    universe: UniverseEnum.MARVEL,
    pictureUrl: 'spider-man.jpg',
    description: 'Friendly neighborhood Spider-Man.',
  };

  beforeEach(async () => {
    mockHeroService = {
      addNewHero: jasmine.createSpy('addNewHero'),
      editHero: jasmine.createSpy('editHero'),
      removeHero: jasmine.createSpy('removeHero'),
    };

    mockAppStatusService = {
      isLoading: signal(false),
    };

    mockDialogRef = {
      close: jasmine.createSpy('close'),
      afterClosed: () => of(true),
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue(mockDialogRef),
    };

    await TestBed.configureTestingModule({
      imports: [HeroForm, MatDialogModule],
      providers: [
        FormBuilder,
        { provide: HeroManagementSerivce, useValue: mockHeroService },
        { provide: AppStatusService, useValue: mockAppStatusService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();
  });

  describe('creation mode', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(HeroForm);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize the form with empty values', () => {
      const formValues = component.heroForm.value;
      expect(formValues.name).toEqual('');
      expect(formValues.alterEgo).toEqual('');
      expect(formValues.power).toEqual('');
    });

    it('should call addNewHero on submit when form is valid', () => {
      component.heroForm.setValue({
        name: 'Iron Man',
        alterEgo: 'Tony Stark',
        power: 90,
        universe: 'Marvel',
        pictureUrl: 'iron-man.jpg',
        description: 'Genius, billionaire, playboy, philanthropist.',
      });
      component.onSubmit();
      expect(mockHeroService.addNewHero).toHaveBeenCalled();
    });

    it('should not call addNewHero on submit when form is invalid', () => {
      component.heroForm.setValue({
        name: '',
        alterEgo: '',
        power: '',
        universe: '',
        pictureUrl: '',
        description: '',
      });

      component.heroForm.setErrors(['testError']);
      component.onSubmit();
      expect(mockHeroService.addNewHero).not.toHaveBeenCalled();
    });
  });

  describe('edition mode', () => {
    beforeEach(() => {
      TestBed.overrideProvider(MAT_DIALOG_DATA, { useValue: mockHero });
      fixture = TestBed.createComponent(HeroForm);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should initialize the form with hero data', () => {
      const formValues = component.heroForm.value;
      expect(formValues.name).toEqual(mockHero.name.toUpperCase());
      expect(formValues.alterEgo).toEqual(mockHero.alterEgo);
      expect(formValues.power).toEqual(mockHero.power);
    });

    it('should call editHero on submit when form is valid', () => {
      component.heroForm.setValue({
        name: 'Spider-Man',
        alterEgo: 'Peter Parker',
        power: 20,
        universe: 'Marvel',
        pictureUrl: 'spider-man-2.jpg',
        description: 'New description.',
      });
      component.onSubmit();
      expect(mockHeroService.editHero).toHaveBeenCalledWith({
        ...component.heroForm.value,
        id: mockHero.id,
      });
    });

    it('should open the confirmation dialog when showConfirmation is called', () => {
      component.showConfirmation();
      expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should call removeHero and close dialog if confirmation is true', fakeAsync(() => {
      component.showConfirmation();
      const heroId = component.data?.id || '';
      expect(mockDialog.open).toHaveBeenCalled();

      mockDialogRef.close(true);
      tick();

      expect(mockHeroService.removeHero).toHaveBeenCalledWith(heroId);
      expect(mockDialogRef.close).toHaveBeenCalledWith(true);
    }));
  });
});

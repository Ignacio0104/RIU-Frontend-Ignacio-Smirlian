import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { pictureUrlValidator } from './validators';
import { HeroManagementSerivce } from '../../../services/hero-management.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UppercaseDirective } from '../../../directives/upper-case.directive';
import { Hero } from '../../../models/hero-models';
import { HeroImage } from '../hero-image/hero-image';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDelete } from '../confirm-delete/confirm-delete';
import { AppStatusService } from '../../../services/app-status.service';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    UppercaseDirective,
    HeroImage,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  appStatusSvc = inject(AppStatusService);
  heroForm!: FormGroup;

  fb = inject(FormBuilder);

  dialog = inject(MatDialog);

  data = inject<Hero | null>(MAT_DIALOG_DATA, { optional: true });

  saving: boolean = false;

  dialogRef = inject(MatDialogRef<HeroForm>);

  heroService = inject(HeroManagementSerivce);

  formSubmitted = signal(false);

  constructor() {
    effect(() => {
      this.saving = this.appStatusSvc.isLoading();
      if (this.formSubmitted() && !this.saving) {
        this.dialogRef.close(this.data ? 'edited' : 'created');
      }
    });
  }

  ngOnInit(): void {
    const defaultValues = {
      name: '',
      alterEgo: '',
      power: '',
      universe: '',
      pictureUrl: '',
      description: '',
    };

    const { alterEgo, description, name, pictureUrl, power, universe } = this
      .data
      ? { ...defaultValues, ...this.data }
      : defaultValues;

    this.heroForm = this.fb.group({
      name: [name, Validators.required],
      alterEgo: [alterEgo, Validators.required],
      power: [power, [Validators.required]],
      universe: [universe, Validators.required],
      pictureUrl: [pictureUrl, [pictureUrlValidator()]],
      description: [description],
    });
  }

  controlIsInvalid(controlName: string) {
    const control = this.heroForm.get(controlName);
    return control?.touched && control.invalid;
  }

  getPowerError() {
    const control = this.heroForm.get('power');
    if (control?.errors) {
      switch (control?.errors[0]) {
        case 'max':
          return 'Power is too big (Max value is 500)';
        case 'notNumeric':
          return 'Power must be a number';
        default:
          return 'Power is a required field';
      }
    }
    return '';
  }

  displayImage() {
    const control = this.heroForm.get('pictureUrl');
    return (
      control?.value &&
      (control.dirty || this.data?.pictureUrl) &&
      !this.controlIsInvalid('pictureUrl')
    );
  }

  onSubmit() {
    if (!this.heroForm.errors) {
      this.formSubmitted.set(true);
      if (this.data) {
        this.heroService.editHero({ ...this.heroForm.value, id: this.data.id });
      } else {
        this.heroService.addNewHero({
          ...this.heroForm.value,
        });
      }
    }
  }

  showConfirmation() {
    const dialogRef = this.dialog.open(ConfirmDelete, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.heroService.removeHero(this.data?.id || '');
        this.dialogRef.close('edit');
      }
    });
  }
}

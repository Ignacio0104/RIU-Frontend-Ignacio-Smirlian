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
import { HeroManagementSerivce } from '../../../services/hero-management-service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UppercaseDirective } from '../../../directives/upper-case-directive';
import { Hero } from '../../../models/hero-models';
import { HeroImage } from '../hero-image/hero-image';

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
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  heroForm!: FormGroup;

  fb = inject(FormBuilder);

  data = inject<Hero | null>(MAT_DIALOG_DATA, { optional: true });

  saving: boolean = false;

  dialogRef = inject(MatDialogRef<HeroForm>);

  heroService = inject(HeroManagementSerivce);

  formSubmitted = signal(false);

  constructor() {
    effect(() => {
      this.saving = this.heroService.isLoading();
      if (this.formSubmitted() && !this.saving) {
        this.dialogRef.close(true);
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
}

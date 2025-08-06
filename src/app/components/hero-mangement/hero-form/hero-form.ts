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
import { MatDialogRef } from '@angular/material/dialog';
import { UppercaseDirective } from '../../../directives/upper-case-directive';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    UppercaseDirective,
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  heroForm!: FormGroup;

  fb = inject(FormBuilder);

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
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      alterEgo: ['', Validators.required],
      power: ['', [Validators.required]],
      universe: ['', Validators.required],
      pictureUrl: ['', [pictureUrlValidator()]],
      description: [''],
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

  onSubmit() {
    if (this.heroForm.valid) {
      this.formSubmitted.set(true);
      this.heroService.addNewHero({
        ...this.heroForm.value,
      });
    }
  }
}

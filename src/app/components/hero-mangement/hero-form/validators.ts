import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function pictureUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const urlRegex =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

    const fileRegex = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;

    const isValid =
      urlRegex.test(control.value) && fileRegex.test(control.value);

    return isValid ? null : { invalidUrl: { value: control.value } };
  };
}

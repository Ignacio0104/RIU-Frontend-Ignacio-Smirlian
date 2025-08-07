import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  private readonly ngControl = inject(NgControl);

  ngOnInit() {
    if (this.ngControl.value) {
      const upperCaseValue = (this.ngControl.value as string).toUpperCase();
      this.ngControl.control?.setValue(upperCaseValue, { emitEvent: false });
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement instanceof HTMLInputElement) {
      if (this.ngControl.control) {
        const start = inputElement.selectionStart;
        const end = inputElement.selectionEnd;

        const newUppercaseValue = inputElement.value.toUpperCase();

        this.ngControl.control.setValue(newUppercaseValue, {
          emitEvent: false,
        });

        inputElement.setSelectionRange(start, end);
      }
    }
  }
}

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { UppercaseDirective } from './upper-case-directive';

@Component({
  template: ` <input type="text" [formControl]="testControl" appUppercase /> `,
  standalone: true,
  imports: [UppercaseDirective, ReactiveFormsModule, FormsModule],
  providers: [],
})
class TestComponent {
  testControl = new FormControl('test value');
}

describe('UppercaseDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let ngControl: NgControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    ngControl = inputEl.injector.get(NgControl);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(inputEl).toBeTruthy();
    expect(inputEl.injector.get(UppercaseDirective)).toBeTruthy();
  });

  it('should capitalize the initial value on initialization', () => {
    expect(ngControl.value).toBe('TEST VALUE');
  });

  it('should capitalize the input value on user input', () => {
    const inputElement = inputEl.nativeElement as HTMLInputElement;
    inputElement.value = 'hello world';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(ngControl.value).toBe('HELLO WORLD');
  });

  it('should preserve the cursor position after capitalizing the input', () => {
    const inputElement = inputEl.nativeElement as HTMLInputElement;
    inputElement.value = 'hello world';
    inputElement.selectionStart = 5;
    inputElement.selectionEnd = 5;

    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputElement.value).toBe('HELLO WORLD');
    expect(inputElement.selectionStart).toBe(5);
    expect(inputElement.selectionEnd).toBe(5);
  });
});

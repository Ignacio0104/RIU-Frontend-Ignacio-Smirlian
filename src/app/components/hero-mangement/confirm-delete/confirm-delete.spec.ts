import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDelete } from './confirm-delete';
import { MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDelete', () => {
  let component: ConfirmDelete;
  let fixture: ComponentFixture<ConfirmDelete>;
  let mockDialogRef: { close: jasmine.Spy };

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    await TestBed.configureTestingModule({
      imports: [ConfirmDelete],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

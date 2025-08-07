import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStatusService {
  private _isLoading = signal<boolean>(false);

  readonly isLoading = this._isLoading.asReadonly();

  updateLoadingStatus(value: boolean) {
    this._isLoading.set(value);
  }
}

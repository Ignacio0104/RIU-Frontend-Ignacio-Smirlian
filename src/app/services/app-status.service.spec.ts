import { TestBed } from '@angular/core/testing';
import { AppStatusService } from './app-status.service';

describe('AppStatusService', () => {
  let service: AppStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStatusService],
    });
    service = TestBed.inject(AppStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with isLoading as false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should update isLoading to true when updateLoadingStatus is called with true', () => {
    service.updateLoadingStatus(true);
    expect(service.isLoading()).toBe(true);
  });

  it('should update isLoading to false when updateLoadingStatus is called with false', () => {
    service.updateLoadingStatus(true);
    expect(service.isLoading()).toBe(true);
    service.updateLoadingStatus(false);
    expect(service.isLoading()).toBe(false);
  });
});

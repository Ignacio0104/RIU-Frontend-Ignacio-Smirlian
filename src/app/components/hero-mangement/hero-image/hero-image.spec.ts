import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeroImage } from './hero-image';

describe('HeroImage', () => {
  let component: HeroImage;
  let fixture: ComponentFixture<HeroImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroImage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroImage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('heroImage', 'test.jpg');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set isLoading to false and imageLoad to true on image load', () => {
    fixture.componentRef.setInput('heroImage', 'test.jpg');
    fixture.detectChanges();

    component.onImageLoad();

    expect(component.isLoading()).toBe(false);
    expect(component.imageLoad()).toBe(true);
  });

  it('should keep isLoading true if image fails to load after 5 seconds', fakeAsync(() => {
    fixture.componentRef.setInput('heroImage', 'test.jpg');
    fixture.detectChanges();

    expect(component.isLoading()).toBe(true);

    tick(5000);

    expect(component.isLoading()).toBe(true);
  }));

  it('should not change isLoading after 5 seconds if image has already loaded', fakeAsync(() => {
    fixture.componentRef.setInput('heroImage', 'test.jpg');
    fixture.detectChanges();

    component.onImageLoad();
    expect(component.isLoading()).toBe(false);

    tick(5000);

    expect(component.isLoading()).toBe(false);
  }));
});

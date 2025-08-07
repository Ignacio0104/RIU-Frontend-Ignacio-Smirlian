import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFilter } from './hero-filter';

describe('HeroFilter', () => {
  let component: HeroFilter;
  let fixture: ComponentFixture<HeroFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the filterUpdated event with the correct text', () => {
    const emitSpy = spyOn(component.filterUpdated, 'emit');

    const testText = 'Spider-Man';

    component.onFilter(testText);

    expect(emitSpy).toHaveBeenCalledWith(testText);
  });
});

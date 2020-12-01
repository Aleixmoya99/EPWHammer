import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageChosenComponent } from './average-chosen.component';

describe('AverageChosenComponent', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageChosenComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a gun', () => {
    const gun = {
      name: 'Absolvor Bolt Pistol',
      points: 0,
      Range: 18,
      Type: 'Pistol',
      NoS: 1,
      S: 5,
      Ap: -1,
      D: 2,
      Ability: '',
    };

    component.onSelect(gun);

    expect(component.selectedGun).toEqual(gun);
  });
});

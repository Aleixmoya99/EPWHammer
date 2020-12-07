import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { AverageChosenComponent } from './average-chosen.component';
import { Gun } from '../home';

describe('AverageChosenComponent', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageChosenComponent],
      providers: [
        { provide: HttpClient },
        { provide: IssueService, useValue: { getIssues: () => {} } },
        {
          provide: EpwhammerService,
          useValue: {
            chooseSv: () => {},
            toWound: () => {},
            estimateVal: () => {},
            calculations: () => {},
            calculateWounds: () => {},
            calculateDeadModels: () => {},
          },
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call get Array', () => {
    // eslint-disable-next-line no-undef
    const spyFn = spyOn(component, 'getArray').and.callThrough();
    component.getArray();
    expect(spyFn).toHaveBeenCalled();
  });
});
describe('test onSelect', () => {
  let component: AverageChosenComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageChosenComponent],
      providers: [
        { provide: HttpClient },
        { provide: IssueService, useValue: { getIssues: () => {} } },
        {
          provide: EpwhammerService,
          useValue: {
            chooseSv: () => {},
            toWound: () => {},
            estimateVal: () => {},
            calculations: () => {},
            calculateWounds: () => {},
            calculateDeadModels: () => {},
          },
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
  });
  it('should return a saved gun', () => {
    const gun: Gun = {
      name: 'Try1',
      Range: 'Some',
      Type: 'Is this an interrogation?',
      NoS: 'Number of What',
      S: 'A lot bb',
      Ap: 'not much since quarentene',
      D: 'tones',
      Ability: 'none',
      Overcharged: 'no, god!',
      profile: 'i got 2, witch one?',
      points: 'i give myself 5 stars',
    };
    component.onSelect(gun);

    expect(component.selectedGun).toEqual(gun);
  });
});

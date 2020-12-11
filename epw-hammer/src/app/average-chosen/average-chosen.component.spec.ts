import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { AverageChosenComponent } from './average-chosen.component';

describe('AverageChosenComponent', () => {
  let component: AverageChosenComponent;
  let fixture: any;
  let warhammerService: EpwhammerService;
  let myService: IssueService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageChosenComponent],
      providers: [
        { provide: HttpClient },
        { provide: warhammerService, useValue: { calculateWounds: () => {}, factionAverageWounds: () => {} } },
        { provide: myService, useValue: { getIssues: () => {} } },
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
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call getArray and return list of guns', () => {
    spyOn(myService, 'getIssues').and.returnValue((new (Observable)()));
    component.getArray();
    expect(myService.getIssues).toHaveBeenCalled();
  });
  it('calculateOverchargedWounds', () => {
    const selectedGun = {
      Overcharged: {
        S: 8,
        Ap: -4,
        D: 2,
      },
    };
    const Equivalent = {
      Toughness: 3,
      W: 2,
      Sv: 5,
      SvIn: 7,
      FnP: 7,
    };
    const myTest = spyOn(warhammerService, 'calculateWounds').and.callThrough();
    component.calculateOverchargedWounds(Equivalent);
    expect(myTest).toHaveBeenCalled();
  });
});

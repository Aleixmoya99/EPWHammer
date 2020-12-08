import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { AverageChosenComponent } from './average-chosen.component';
import { Gun } from '../home';

describe('AverageChosenComponent', () => {
  let component: AverageChosenComponent;
  let fixture: any;
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
      imports: [HttpClientTestingModule, RouterModule.forRoot([])],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call getArray and return list of guns', async (done) => {
    // eslint-disable-next-line no-undef
    const spyedGetArray = spyOn(component, 'getArray').and.callThrough();

    expect(spyedGetArray).toHaveBeenCalled();
    done();
  });
});

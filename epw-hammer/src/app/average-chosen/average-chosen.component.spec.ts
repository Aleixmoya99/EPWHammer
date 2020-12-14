import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AverageChosenComponent } from './average-chosen.component';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';

fdescribe('AverageChosenComponent getters', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;
  let service: EpwhammerService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageChosenComponent],
      imports: [HttpClientTestingModule],
      providers: [
        IssueService,
        { provide: MatDialog, useValue: {} },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get ap 0 correctly', () => {
    component.selectedGun.Ap = 0;
    const mockname = component.armourPenetration;
    expect(mockname).toEqual('0');
  });

  it('should get Points 0 correctly', () => {
    component.selectedGun.points = 0;
    const mockname = component.points;
    expect(mockname).toEqual('0');
  });

  it('should get Points 12 correctly', () => {
    component.selectedGun.points = 12;
    const mockname = component.points;
    expect(mockname).toEqual(12);
  });

  it('should get Points undefined correctly', () => {
    component.selectedGun.points = null;
    const mockname = component.points;
    expect(mockname).toEqual('');
  });

  it('should get Overcharge correctly', () => {
    component.selectedGun = { Overcharged: {} };
    const mockname = component.overcharged;
    expect(mockname).toEqual('Overcharged');
  });

  fit('should get Overcharge S correctly', () => {
    component.selectedGun = {};
    component.selectedGun.Overcharged = {};
    component.selectedGun.Overcharged.S = 7;
    const mockname = component.overchargedStrength;
    expect(mockname).toEqual(7);
  });

  it('should get Overcharge Ap correctly', () => {
    component.selectedGun = { Overcharged: { Ap: -4 } };
    const mockname = component.overchargedAP;
    expect(mockname).toEqual(-4);
  });

  it('should get Overcharge D correctly', () => {
    component.selectedGun = { Overcharged: { D: 2 } };
    const mockname = component.overchargedD;
    expect(mockname).toEqual(2);
  });
});

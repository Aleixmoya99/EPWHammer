/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AverageChosenComponent } from './average-chosen.component';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { MEQ } from '../mockEpwhammer';

describe('AverageChosenComponent getters', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;
  let service: EpwhammerService;
  let issueService : IssueService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy};
  const overchargedGun = {
    name: 'Assault Plasma Incinerator',
    points: 0,
    Range: 24,
    Type: 'Assault',
    NoS: 3,
    S: 6,
    Ap: -4,
    D: 1,
    Overcharged: {
      S: 7,
      Ap: -4,
      D: 2,
      Ability: '1 Mortal wound on 1s to hit',
    },
    Ability: '',
  };
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
    issueService = new IssueService(httpClientSpy as any);
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
    component.selectedGun = overchargedGun;
    const mockname = component.overcharged;
    expect(mockname).toEqual('Overcharged');
  });

  it('should get Overcharge S correctly', () => {
    component.selectedGun = overchargedGun;
    const mockname = component.overchargedStrength;
    expect(mockname).toEqual(7);
  });

  it('should get Overcharge Ap correctly', () => {
    component.selectedGun = overchargedGun;
    const mockname = component.overchargedAP;
    expect(mockname).toEqual(-4);
  });

  it('should get Overcharge D correctly', () => {
    component.selectedGun = overchargedGun;
    const mockname = component.overchargedD;
    expect(mockname).toEqual(2);
  });
  it('should get Overcharge Ability correctly', () => {
    component.selectedGun = overchargedGun;
    const mockname = component.overchargedAbility;
    expect(mockname).toEqual('1 Mortal wound on 1s to hit');
  });
});

describe('calculate Wounds', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;
  let service: EpwhammerService;
  let issueService : IssueService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy};
  const overchargedGun = {
    name: 'Assault Plasma Incinerator',
    points: 0,
    Range: 24,
    Type: 'Assault',
    NoS: 3,
    S: 6,
    Ap: -4,
    D: 1,
    Overcharged: {
      S: 7,
      Ap: -4,
      D: 2,
      Ability: '1 Mortal wound on 1s to hit',
    },
    Ability: '',
  };
  const meltadGun = {
    name: 'Multi-melta',
    points: 0,
    Ability: '',
    melta: {
      'no-melta': {
        Range: 24,
        Type: 'Heavy',
        NoS: 2,
        S: 8,
        Ap: -4,
        D: 'D6',
        Ability: '',
      },
      'melta-range': {
        Range: 12,
        Type: 'Heavy',
        NoS: 2,
        S: 8,
        Ap: -4,
        D: 'D6 + 2',
        Ability: '',
      },
    },
  };
  const profileGun = {
    name: 'Astartes Grenade Launcher',
    points: 5,
    Range: 30,
    Type: 'Assault',
    profile: {
      frag: {
        NoS: 'D6',
        S: 3,
        Ap: 0,
        D: 1,
        Ability: 'Blast',
      },
      krak: {
        NoS: 1,
        S: 6,
        Ap: -1,
        D: 'D3',
        Ability: '',
      },
    },
    Ability: '',
  };
  const marineEquivalent = MEQ;

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
    issueService = new IssueService(httpClientSpy as any);
    fixture.detectChanges();
  });

  it('calculate overcharged wounds overcharged gun is selected', () => {
    component.selectedGun = overchargedGun;
    const total = component.calculateOverchargedWounds(marineEquivalent);
    expect(total).toEqual(4.02);
  });

  it('calculate profile wounds profile gun is selected, profile 0', () => {
    component.selectedGun = profileGun;
    const total = component.calculateProfileWounds(marineEquivalent, 0);
    expect(total).toEqual(0.38);
  });

  it('calculate melta wounds selected', () => {
    component.selectedGun = meltadGun;
    const total = component.calculateMeltaWounds(marineEquivalent, 0);
    expect(total).toEqual(5.81);
  });
});

describe('calculate Dead', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;
  let service: EpwhammerService;
  let issueService : IssueService;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy};
  const meltaGun = {
    name: 'Multi-melta',
    points: 0,
    Ability: '',
    melta: {
      'no-melta': {
        Range: 24,
        Type: 'Heavy',
        NoS: 2,
        S: 8,
        Ap: -4,
        D: 'D6',
        Ability: '',
      },
      'melta-range': {
        Range: 12,
        Type: 'Heavy',
        NoS: 2,
        S: 8,
        Ap: -4,
        D: 'D6 + 2',
        Ability: '',
      },
    },
  };
  const profileGun = {
    name: 'Astartes Grenade Launcher',
    points: 5,
    Range: 30,
    Type: 'Assault',
    profile: {
      frag: {
        NoS: 'D6',
        S: 3,
        Ap: 0,
        D: 1,
        Ability: 'Blast',
      },
      krak: {
        NoS: 1,
        S: 6,
        Ap: -1,
        D: 'D3',
        Ability: '',
      },
    },
    Ability: '',
  };
  const marineEquivalent = MEQ;

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
    issueService = new IssueService(httpClientSpy as any);
    fixture.detectChanges();
  });

  it('calculate profile dead profile gun is selected, profile 0', () => {
    component.selectedGun = profileGun;
    const total = component.calculateProfileDead(marineEquivalent, 0);
    expect(total).toEqual(0);
  });
  it('calculate melta dead is selected, profile 1', () => {
    component.selectedGun = meltaGun;
    const total = component.calculateMeltaDead(marineEquivalent, 1);
    expect(total).toEqual(2);
  });
});

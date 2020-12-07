import { TestBed } from '@angular/core/testing';
import { Gun } from './home';
import { EpwhammerService } from './epwhammer.service';
import { Modifiers } from './DataModifiers';

describe('EpwhammerService', () => {
  let service: EpwhammerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('function choose Sv', () => {
  let service: EpwhammerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
  });
  it('should return normal Sv without modify', () => {
    const Ap: number = 0;
    const Sv: number = 3;
    const SvI: number = 7;
    const SvModifier: number = 0;

    const output:number = service.chooseSv(Ap, Sv, SvI, SvModifier);

    expect(output).toEqual(Sv);
  });
  it('should return SvI', () => {
    const Ap: number = -5;
    const Sv: number = 3;
    const SvI: number = 7;
    const SvModifier: number = 0;

    const output:number = service.chooseSv(Ap, Sv, SvI, SvModifier);

    expect(output).toEqual(SvI);
  });
  it('should return Sv modified by Ap', () => {
    const Ap: number = -1;
    const Sv: number = 3;
    const SvI: number = 7;
    const SvModifier: number = 0;

    const output:number = service.chooseSv(Ap, Sv, SvI, SvModifier);

    expect(output).toEqual((Sv - Ap));
  });
  it('Checking SvModifier does not alterate below 2', () => {
    const Ap: number = 0;
    const Sv: number = 2;
    const SvI: number = 7;
    const SvModifier: number = 1;

    const output:number = service.chooseSv(Ap, Sv, SvI, SvModifier);

    expect(output).toEqual(2);
  });
  it('Checking SvModifier does not alterate above 7', () => {
    const Ap: number = -5;
    const Sv: number = 4;
    const SvI: number = 7;
    const SvModifier: number = -1;

    const output:number = service.chooseSv(Ap, Sv, SvI, SvModifier);

    expect(output).toEqual(7);
  });
});
describe('function Wound test', () => {
  let service: EpwhammerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
  });
  it('should return 2+', () => {
    const S: number = 6;
    const T: number = 3;
    const WoundModifier: number = 0;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(2);
  });
  it('should return 3+', () => {
    const S: number = 5;
    const T: number = 3;
    const WoundModifier: number = 0;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(3);
  });
  it('should return 4+', () => {
    const S: number = 3;
    const T: number = 3;
    const WoundModifier: number = 0;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(4);
  });
  it('should return 5+', () => {
    const S: number = 3;
    const T: number = 4;
    const WoundModifier: number = 0;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(5);
  });
  it('should return 6+', () => {
    const S: number = 2;
    const T: number = 4;
    const WoundModifier: number = 0;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(6);
  });
  it('should not return lower than 2', () => {
    const S: number = 8;
    const T: number = 4;
    const WoundModifier: number = 1;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(2);
  });
  it('should not return above than 6', () => {
    const S: number = 2;
    const T: number = 4;
    const WoundModifier: number = -1;

    const output:number = service.toWound(S, T, WoundModifier);

    expect(output).toEqual(6);
  });
});

describe('function estamate Value test', () => {
  let service: EpwhammerService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
  });
  it('should return 3.5', () => {
    const val: string = 'D6';

    const output:number = service.estimateVal(val);

    expect(output).toEqual(3.5);
  });
  it('should return 2', () => {
    const val: string = 'D3';

    const output:number = service.estimateVal(val);

    expect(output).toEqual(2);
  });
  it('should return 7', () => {
    const val: string = '2D6';

    const output:number = service.estimateVal(val);

    expect(output).toEqual(7);
  });
  it('should return 4', () => {
    const val: string = '2D3';

    const output:number = service.estimateVal(val);

    expect(output).toEqual(4);
  });
  it('should return 5', () => {
    const val: string = 'D3 + 3';

    const output:number = service.estimateVal(val);

    expect(output).toEqual(5);
  });
  it('should return number', () => {
    const val: number = Math.random() * 10;

    const output:number = service.estimateVal(val);

    expect(output).toEqual(val);
  });
  it('should return nothing', () => {
    const val: string = 'asfvnaspvnsdovnaofinv`wevnà132r';

    const output:number = service.estimateVal(val);

    expect(output).toBeNaN();
  });
});

describe('function Calculations test', () => {
  let service: EpwhammerService;
  let serviceSpyConfirmSpy: any;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    serviceSpyConfirmSpy = spyOn(service, 'estimateVal').and.callThrough();
  });
  it('estimateVal to have been called', () => {
    const NoS: number = 3;
    const woundOn: number = 3;
    const chosenSv: number = 3;

    service.calculations(NoS, woundOn, chosenSv);
    expect(serviceSpyConfirmSpy).toHaveBeenCalled();
  });
  it('all Numbers', () => {
    const NoS: number = 3;
    const woundOn: number = 3;
    const chosenSv: number = 3;

    const result = service.calculations(NoS, woundOn, chosenSv);
    expect(result).toEqual(27);
  });
  it('NoS String', () => {
    const NoS: string = 'D3';
    const woundOn: number = 3;
    const chosenSv: number = 3;

    const result = service.calculations(NoS, woundOn, chosenSv);
    expect(result).toEqual(18);
  });
});

describe('function Calculate Wounds test', () => {
  let service: EpwhammerService;
  let serviceSpyToWound: any;
  let serviceSpyChooseSv: any;
  let serviceSpyCalculations: any;
  let gun: Gun;
  let modifiers: Modifiers;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    serviceSpyToWound = spyOn(service, 'toWound').and.callThrough();
    // eslint-disable-next-line no-undef
    serviceSpyChooseSv = spyOn(service, 'chooseSv').and.callThrough();
    // eslint-disable-next-line no-undef
    serviceSpyCalculations = spyOn(service, 'calculations').and.callThrough();
  });
  it('toWound is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const FnP: number = 7;

    service.calculateWounds({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers });
    expect(serviceSpyToWound).toHaveBeenCalled();
  });
  it('chooseSv is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const FnP: number = 7;

    service.calculateWounds({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers });
    expect(serviceSpyChooseSv).toHaveBeenCalled();
  });
  it('calculations is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const FnP: number = 7;

    service.calculateWounds({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers });
    expect(serviceSpyCalculations).toHaveBeenCalled();
  });
  it('calculateWounds should return 0,25', () => {
    const S: number = 4;
    const Ap: number = -1;
    const NoS: number | string = 1;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 3;
    const SvInv: number = 7;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateWounds({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save });
    expect(result).toEqual(0.25);
  });
});
describe('function Calculate Dead test', () => {
  let service: EpwhammerService;
  let serviceSpyToWound: any;
  let serviceSpyChooseSv: any;
  let serviceSpyCalculations: any;
  let gun: Gun;
  let modifiers: Modifiers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    serviceSpyToWound = spyOn(service, 'toWound').and.callThrough();
    // eslint-disable-next-line no-undef
    serviceSpyChooseSv = spyOn(service, 'chooseSv').and.callThrough();
    // eslint-disable-next-line no-undef
    serviceSpyCalculations = spyOn(service, 'calculations').and.callThrough();
  });
  it('toWound is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    service.calculateDeadModels({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(serviceSpyToWound).toHaveBeenCalled();
  });
  it('chooseSv is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    service.calculateDeadModels({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(serviceSpyChooseSv).toHaveBeenCalled();
  });
  it('calculations is Called', () => {
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    service.calculateDeadModels({ ...gun }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(serviceSpyCalculations).toHaveBeenCalled();
  });
  it('calculateDead should return 0 on T = S', () => {
    const S: number = 4;
    const Ap: number = -1;
    const NoS: number | string = 1;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(0);
  });
  it('calculateDead should return 1 on T = S', () => {
    const S: number = 4;
    const Ap: number = -1;
    const NoS: number | string = 4;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(1);
  });
  it('calculateDead should return 0 T = S, 2+"', () => {
    const S: number = 4;
    const Ap: number = -1;
    const NoS: number | string = 1;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 2;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(0);
  });

  it('calculateDead should return 0 T > S', () => {
    const S: number = 3;
    const Ap: number = -1;
    const NoS: number | string = 1;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(0);
  });

  it('calculateDead should return 1 T < S', () => {
    const S: number = 5;
    const Ap: number = -1;
    const NoS: number | string = 3;
    const D: number | string = 1;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(1);
  });
  it('calculateDead D > W', () => {
    const S: number = 5;
    const Ap: number = -1;
    const NoS: number | string = 3;
    const D: number | string = 2;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const wounds: number = 1;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    const result = service.calculateDeadModels({
      ...gun, S, Ap, NoS, D,
    }, Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(result).toEqual(1);
  });
});

describe('function Faction Average Wounds', () => {
  let service: EpwhammerService;
  let serviceSpyCalculateWounds: any;
  let gun: Gun;
  let modifiers: Modifiers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    serviceSpyCalculateWounds = spyOn(service, 'calculateWounds').and.callThrough();
  });
  it('calculateWounds is Called', () => {
    const S: number = 5;
    const Ap: number = -1;
    const NoS: number | string = 3;
    const D: number | string = 2;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const FnP: number = 7;
    const Wound: number = 0;
    const Save: number = 0;

    service.factionAverageWounds([{
      ...gun, S, Ap, NoS, D,
    }], Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save });
    expect(serviceSpyCalculateWounds).toHaveBeenCalled();
  });
});
describe('function Faction Average models killed', () => {
  let service: EpwhammerService;
  let serviceSpyCalculateWounds: any;
  let gun: Gun;
  let modifiers: Modifiers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    serviceSpyCalculateWounds = spyOn(service, 'calculateDeadModels').and.callThrough();
  });
  it('factionAverageModelsKilled is Called', () => {
    const S: number = 5;
    const Ap: number = -1;
    const NoS: number | string = 3;
    const D: number | string = 2;
    const Toughness: number = 4;
    const Sv: number = 4;
    const SvInv: number = 4;
    const FnP: number = 7;
    const wounds: number = 2;
    const Wound: number = 0;
    const Save: number = 0;

    service.factionAverageModelsKilled([{
      ...gun, S, Ap, NoS, D,
    }], Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(serviceSpyCalculateWounds).toHaveBeenCalled();
  });
  it('if total lesser than 0', () => {
    const S: number = 4;
    const Ap: number = 0;
    const NoS: number | string = 1;
    const D: number | string = 1;
    const Toughness: number = 8;
    const Sv: number = 2;
    const SvInv: number = 4;
    const FnP: number = 7;
    const wounds: number = 30;
    const Wound: number = 0;
    const Save: number = 0;

    service.factionAverageModelsKilled([{
      ...gun, S, Ap, NoS, D,
    }], Toughness, Sv, SvInv, FnP, { ...modifiers, Wound, Save }, wounds);
    expect(serviceSpyCalculateWounds).toHaveBeenCalled();
  });
});

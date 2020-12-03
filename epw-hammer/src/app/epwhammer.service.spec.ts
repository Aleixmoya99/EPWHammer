import { TestBed } from '@angular/core/testing';
import { Gun } from './home';
import { EpwhammerService } from './epwhammer.service';

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

    const output:number = service.chooseSv(Ap, Sv, SvI);

    expect(output).toEqual(Sv);
  });
  it('should return SvI', () => {
    const Ap: number = -4;
    const Sv: number = 3;
    const SvI: number = 7;

    const output:number = service.chooseSv(Ap, Sv, SvI);

    expect(output).toEqual(SvI);
  });
  it('should return Sv modified by Ap', () => {
    const Ap: number = -2;
    const Sv: number = 3;
    const SvI: number = 7;

    const output:number = service.chooseSv(Ap, Sv, SvI);

    expect(output).toEqual((Sv - Ap));
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

    const output:number = service.toWound(S, T);

    expect(output).toEqual(2);
  });
  it('should return 3+', () => {
    const S: number = 5;
    const T: number = 3;

    const output:number = service.toWound(S, T);

    expect(output).toEqual(3);
  });
  it('should return 4+', () => {
    const S: number = 3;
    const T: number = 3;

    const output:number = service.toWound(S, T);

    expect(output).toEqual(4);
  });
  it('should return 5+', () => {
    const S: number = 3;
    const T: number = 4;

    const output:number = service.toWound(S, T);

    expect(output).toEqual(5);
  });
  it('should return 6+', () => {
    const S: number = 2;
    const T: number = 4;

    const output:number = service.toWound(S, T);

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

fdescribe('function Calculate Wounds test', () => {
  let service: EpwhammerService;
  let serviceSpyToWound: any;
  let serviceSpyChooseSv: any;
  let serviceSpyCalculations: any;
  let testGun: Gun;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EpwhammerService);
    // eslint-disable-next-line no-undef
    spyOnProperty(testGun, 'S', 'set').and.returnValue(4);
    // eslint-disable-next-line no-undef
    spyOnProperty(testGun, 'Ap', 'set').and.returnValue(0);
    // eslint-disable-next-line no-undef
    spyOnProperty(testGun, 'D', 'set').and.returnValue(1);
    // eslint-disable-next-line no-undef
    spyOnProperty(testGun, 'NoS', 'set').and.returnValue(3);
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

    service.calculateWounds(testGun, Toughness, Sv, SvInv);
    expect(serviceSpyToWound).toHaveBeenCalled();
  });
});

/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Gun } from './home';
@Injectable({
  providedIn: 'root',
})

export class EpwhammerService {
  chooseSv(Ap: number, Sv: number, SvI: number): number {
    let usedSv: number;
    let SvInv = SvI;
    if (SvInv === undefined) {
      SvInv = 7;
    }
    if ((Sv + Ap) < SvInv) {
      usedSv = Sv - Ap;
    } else {
      usedSv = SvInv;
    }
    return usedSv;
  }

  toWound(S: number, T: number): number {
    let result: number = 7;

    if (S >= 2 * T) {
      result = 2;
    }
    if (S > T && result === 7) {
      result = 3;
    }
    if (S === T && result === 7) {
      result = 4;
    }
    if (S < 2 * T && result === 7) {
      result = 6;
    }
    if (S < T && result === 7) {
      result = 5;
    }
    return result;
  }

  estimateVal(val: string | number): number {
    let estimatedVal: number;
    estimatedVal = 0;
    if (typeof (val) === 'string') {
      switch (val) {
        case 'D6':
          estimatedVal = 3.5;
          break;
        case 'D3':
          estimatedVal = 2;
          break;
        case '2D6':
          estimatedVal = 7;
          break;
        case '2D3':
          estimatedVal = 4;
          break;
        case 'D3 + 3':
          estimatedVal = 5;
          break;
        default:
          break;
      }
    } else {
      estimatedVal = val;
    }
    return estimatedVal;
  }

  calculations(gun: Gun, woundOn: number, chosenSv: number):number {
    const result: number = this.estimateVal(gun.NoS) * woundOn * chosenSv;
    return result;
  }

  calculateWounds(gun: Gun, Toughness: number, Sv: number, SvInv: number): number {
    let woundOn: number = this.toWound(this.estimateVal(gun.S), Toughness);
    let chosenSv: number = this.chooseSv(this.estimateVal(gun.Ap), Sv, SvInv);

    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;

    let result: number = this.calculations(gun, woundOn, chosenSv) * this.estimateVal(gun.D);

    result = parseFloat(result.toFixed(2));
    return result;
  }

  calculateDeadModels(gun: Gun, Toughness: number, Sv: number, SvInv: number, wounds: number): number {
    let woundOn: number = this.toWound(this.estimateVal(gun.S), Toughness);
    let chosenSv: number = this.chooseSv(this.estimateVal(gun.Ap), Sv, SvInv);
    let result: number = 0;
    let i: number;
    const damage: number = this.estimateVal(gun.D);
    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;

    const effectiveDamage: number = (this.calculations(gun, woundOn, chosenSv));

    if (damage === wounds) {
      result = effectiveDamage;
    } else if (damage > wounds) {
      result = effectiveDamage;
    } else if (damage < wounds) {
      result = (effectiveDamage * damage) / wounds;
    }
    result = parseFloat(result.toFixed(2));
    return result;
  }
}

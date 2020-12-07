/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Gun } from './home';
import { Modifiers } from './DataModifiers';
@Injectable({
  providedIn: 'root',
})

export class EpwhammerService {
  chooseSv(Ap: number, Sv: number, SvI: number, SvModifier: number): number {
    let usedSv: number;
    const usedSvModifier:number = SvModifier;
    const SvInv = SvI;
    if ((Sv - Ap) < SvInv) {
      usedSv = Sv - Ap;
    } else {
      usedSv = SvInv;
    }
    usedSv -= usedSvModifier;
    if (usedSv < 2) {
      usedSv = 2;
    }
    if (usedSv > 7) {
      usedSv = 7;
    }
    return usedSv;
  }

  toWound(S: number, T: number, woundModifier: number): number {
    let result: number = 7;
    const usedWoundModifier:number = woundModifier;
    if (S >= 2 * T) {
      result = 2;
    }
    if (S > T && result === 7) {
      result = 3;
    }
    if (S === T && result === 7) {
      result = 4;
    }
    if (S * 2 <= T && result === 7) {
      result = 6;
    }
    if (S < T && result === 7) {
      result = 5;
    }
    result -= usedWoundModifier;
    if (result < 2) {
      result = 2;
    }
    if (result > 6) {
      result = 6;
    }
    return result;
  }

  estimateVal(val: string | number): number {
    let estimatedVal: number;
    estimatedVal = 0;
    if (typeof (val) === 'string') {
      switch (val) {
        case '1':
          estimatedVal = 1;
          break;
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
          estimatedVal = NaN;
          break;
      }
    } else {
      estimatedVal = val;
    }
    return estimatedVal;
  }

  calculations(NoS : string | number, woundOn: number, chosenSv: number):number {
    const result: number = this.estimateVal(NoS) * woundOn * chosenSv;
    return result;
  }

  calculateWounds({
    S, Ap, D, NoS,
  }: Gun, Toughness: number, Sv: number, SvInv: number, FnP: number, modifiers: Modifiers): number {
    let woundOn: number = this.toWound(this.estimateVal(S), Toughness, modifiers.Wound);
    let chosenSv: number = this.chooseSv(this.estimateVal(Ap), Sv, SvInv, modifiers.Save);
    let Attacks: string | number = 1;
    if (NoS !== undefined) {
      Attacks = NoS;
    }
    Attacks = this.estimateVal(Attacks);
    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;
    const thisFnP: number = 1 - (7 - FnP) / 6;

    let result: number = this.calculations(Attacks, woundOn, chosenSv) * (this.estimateVal(D) * thisFnP);

    result = parseFloat(result.toFixed(2));
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(result)) {
      result = 0;
    }
    return result;
  }

  calculateDeadModels({
    S, Ap, D, NoS,
  }: Gun, Toughness: number, Sv: number, SvInv: number, FnP: number, modifiers: Modifiers, wounds: number): number {
    let woundOn: number = this.toWound(this.estimateVal(S), Toughness, modifiers.Wound);
    let chosenSv: number = this.chooseSv(this.estimateVal(Ap), Sv, SvInv, modifiers.Save);
    let result: number = 0;
    let i: number = -1;
    let Attacks: string | number = 1;
    if (NoS !== undefined) {
      Attacks = NoS;
    }
    const thisFnP: number = 1 - (7 - FnP) / 6;
    const damage: number = (this.estimateVal(D) * thisFnP);
    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;

    const effectiveDamage: number = (this.calculations(Attacks, woundOn, chosenSv));

    if (damage === wounds) {
      result = effectiveDamage;
    } else if (damage > wounds) {
      result = effectiveDamage;
    } else if (damage < wounds) {
      let flag = effectiveDamage * damage;
      while (flag >= 0) {
        flag -= wounds;
        i += 1;
      }
      result = i;
    }
    result = Math.round((parseFloat(result.toFixed(2))));
    return result;
  }

  factionAverageWounds(gun: Gun[], T: number, Sv: number, SvInv: number, FnP: number, modifiers:Modifiers): number {
    let i: number = 0;
    let total: number = 0;
    let result: number = 0;
    for (i; i < gun.length; i += 1) {
      result = this.calculateWounds(gun[i], T, Sv, SvInv, FnP, modifiers);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(result)) {
        total += result;
      }
    }
    total /= i;
    return (parseFloat(total.toFixed(2)));
  }

  factionAverageModelsKilled(gun: Gun[], T: number, Sv: number, SvInv: number, FnP: number, modifiers:Modifiers, wounds: number)
  : number {
    let i: number = 0;
    let total: number = 0;
    let result: number = 0;
    for (i; i < gun.length; i += 1) {
      result = this.calculateDeadModels(gun[i], T, Sv, SvInv, FnP, modifiers, wounds);
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(result)) {
        total += result;
      }
    }
    total /= i;
    if (total < 0) {
      total = 0;
    }
    return (parseFloat(total.toFixed(2)));
  }
}

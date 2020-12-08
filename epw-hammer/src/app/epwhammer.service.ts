/* eslint-disable no-restricted-globals */
/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Gun } from './home';
import { Modifiers } from './DataModifiers';
@Injectable({
  providedIn: 'root',
})

export class EpwhammerService {
  currentModifiers: Modifiers | any = {
    Hit: 0,
    Wound: 0,
    Save: 0,
    FnP: 7,
    Damage: 0,
    ModAp: 0,
    SInV: 7,
  };

  get modifiers(): Modifiers {
    return this.currentModifiers;
  }

  setModifiers(newModifiers:Modifiers | any) {
    /*
    console.log(`myModifiers: ${this.currentModifiers}`);
    console.log(`newModifiers: ${newModifiers}`);
    console.log(`newModifiers.Wound: ${newModifiers.Wound}`);
    console.log(`newModifiers.Hit: ${newModifiers.Hit}`);
    console.log(`newModifiers.Sv: ${newModifiers.Save}`);
    console.log(`newModifiers.FnP: ${newModifiers.FnP}`); */
    this.currentModifiers = newModifiers;
    return this.currentModifiers;
  }

  chooseSv(RegAp: number, Sv: number, SvI: number, { ModAp, Save, SInV }:Modifiers): number {
    let usedSv: number;
    const newSinvul = SInV;
    const usedSvModifier:number = Save;
    const SvInv = Math.min(newSinvul, SvI);
    const finalAp = RegAp + ModAp;
    if ((Sv - finalAp) < SvInv) {
      usedSv = Sv - finalAp;
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
        case 'D6 + 2':
          estimatedVal = 5.5;
          break;
        case 'D6 + 4':
          estimatedVal = 7.5;
          break;
        case 'x2':
          estimatedVal = 4;
          break;
        case 'User':
          estimatedVal = 0;
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
    S, Ap, D, NoS, Range,
  }: Gun, Toughness: number, Sv: number, SvInv: number, FnP: number, modifiers: Modifiers): number | string {
    let actualStrength: number = this.estimateVal(S);
    if (Range === 'Melee') {
      actualStrength += 4;
    }
    let woundOn: number = this.toWound(actualStrength, Toughness, modifiers.Wound);
    let chosenSv: number = this.chooseSv(this.estimateVal(Ap), Sv, SvInv, modifiers);
    let Attacks: string | number = 1;
    if (NoS !== undefined) {
      Attacks = NoS;
    }
    Attacks = this.estimateVal(Attacks);
    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;
    const thisFnP: number = 1 - (7 - Math.min(FnP, modifiers.FnP)) / 6;

    let result: number | string = this.calculations(Attacks, woundOn, chosenSv) * (this.estimateVal(D) * thisFnP);

    result = parseFloat(result.toFixed(2));
    if (isNaN(result)) {
      result = '';
    }
    return result;
  }

  calculateDeadModels({
    S, Ap, D, NoS,
  }: Gun, Toughness: number, Sv: number, SvInv: number, FnP: number, modifiers: Modifiers, wounds: number): number | string {
    let woundOn: number = this.toWound(this.estimateVal(S), Toughness, modifiers.Wound);
    let chosenSv: number = this.chooseSv(this.estimateVal(Ap), Sv, SvInv, modifiers);
    let result: number | string = 0;
    let i: number = -1;
    let Attacks: string | number = 1;
    if (NoS !== undefined) {
      Attacks = NoS;
    }
    const thisFnP: number = 1 - (7 - Math.min(FnP, modifiers.FnP)) / 6;
    const damage: number = (this.estimateVal(D) * thisFnP);
    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;

    const effectiveDamage: number = (this.calculations(Attacks, woundOn, chosenSv));
    if (!isNaN(effectiveDamage)) {
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
    }

    if (typeof (S) === 'undefined' || typeof (Ap) === 'undefined' || typeof (D) === 'undefined') {
      result = '';
    }
    return result;
  }

  factionAverageWounds(gun: Gun[], T: number, Sv: number, SvInv: number, FnP: number, modifiers:Modifiers): number {
    let i: number = 0;
    let total: number = 0;
    let result: number | string = 0;
    for (i; i < gun.length; i += 1) {
      result = this.calculateWounds(gun[i], T, Sv, SvInv, FnP, modifiers);
      if (typeof (result) === 'number') {
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
    let result: number | string = 0;
    for (i; i < gun.length; i += 1) {
      result = this.calculateDeadModels(gun[i], T, Sv, SvInv, FnP, modifiers, wounds);
      if (typeof (result) === 'number') {
        if (!isNaN(result)) {
          total += result;
        }
      }
    }
    total /= i;
    return (parseFloat(total.toFixed(2)));
  }
}

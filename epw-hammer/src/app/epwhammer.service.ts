/* eslint-disable class-methods-use-this */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Gun } from './home';
import { TEMPORAL } from './mock-epwhammer';

const { connect } = require('mongoose');

connect('mongodb://localhost/wargeardb', { useNewUrlParser: true, useUnifiedTopology: true });

@Injectable({
  providedIn: 'root',
})

export class EpwhammerService {
  getWargear(): Observable<Gun[]> {
    return of(TEMPORAL);
  }

  chooseSv(Ap: number, Sv: number, SvI: number): number {
    let usedSv: number;
    let SvInv = SvI;
    if (SvInv === undefined) {
      SvInv = 7;
    }
    if ((Sv + Ap) < SvInv) {
      usedSv = Sv;
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

  calculateWounds(gun: Gun, Toughness: number, Sv: number, SvInv: number): number {
    let woundOn: number = this.toWound(this.estimateVal(gun.S), Toughness);
    let chosenSv: number = this.chooseSv(this.estimateVal(gun.Ap), Sv, SvInv);

    woundOn = (7 - woundOn) / 6;
    chosenSv = 1 - (7 - chosenSv) / 6;

    const result: number = this.estimateVal(gun.NoS) * woundOn * chosenSv * this.estimateVal(gun.D);
    return result;
  }
}

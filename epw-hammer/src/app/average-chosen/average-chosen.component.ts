/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { Component, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as c3 from 'c3';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { Gun } from '../home';
import { Unit } from '../DataUnit';
import {
  MEQ, TEQ, GEQ, VEQ, KEQ, modifiers,
} from '../mock-epwhammer';

@Component({
  selector: 'app-average-chosen',
  templateUrl: './average-chosen.component.html',
  styleUrls: ['./average-chosen.component.css'],
})
export class AverageChosenComponent implements AfterViewInit {
  selectedGun: any;

  actualmodifiers = modifiers;

  marineEquivalent = MEQ;

  terminatorEquivalent = TEQ;

  guardsmanEquivalent = GEQ;

  vehicleEquivalent = VEQ;

  knightEquivalent = KEQ;

  guns$: Observable <Gun[]> = this.issueService.getIssues();

  allGuns: Gun[] = this.getArray();

  getArray(): Gun[] {
    this.issueService.getIssues().subscribe((allGuns) => { this.allGuns = allGuns; });
    return this.allGuns;
  }

  get name() {
    return this.selectedGun.name || '';
  }

  get range() {
    return this.selectedGun.Range || '';
  }

  get type() {
    return (this.selectedGun.Type) || '';
  }

  get nos() {
    return (this.selectedGun.NoS) || '';
  }

  get strength() {
    return this.selectedGun.S || '';
  }

  get armourPenetration() {
    let ap;
    this.selectedGun.Ap === 0 ? ap = '0' : ap = this.selectedGun.Ap;
    return ap || '';
  }

  get damage() {
    return this.selectedGun.D || '';
  }

  get ability() {
    return this.selectedGun.Ability || '';
  }

  get points() {
    let cost;
    this.selectedGun.points === 0 ? cost = '0' : cost = this.selectedGun.points;
    return cost || '';
  }

  get overcharged() {
    let overChargeProfile;
    this.selectedGun.Overcharged ? overChargeProfile = 'Overcharged' : overChargeProfile = '';
    return overChargeProfile || '';
  }

  get overchargedStrength() {
    let result;
    this.selectedGun.Overcharged ? result = this.selectedGun.Overcharged.S : result = '';
    return result;
  }

  get overchargedAP() {
    let result;
    this.selectedGun.Overcharged ? result = this.selectedGun.Overcharged.Ap : result = '';
    return result;
  }

  get overchargedD() {
    let result;
    this.selectedGun.Overcharged ? result = this.selectedGun.Overcharged.D : result = '';
    return result;
  }

  get overchargedAbility() {
    let result;
    this.selectedGun.Overcharged ? result = this.selectedGun.Overcharged.Ability : result = '';
    return result;
  }

  calculateOverchargedWounds(Equivalent: Unit) {
    let total: number | string = '';
    const overchargedProfile = this.selectedGun.Overcharged;
    if (typeof (overchargedProfile) !== 'undefined') {
      const { S, Ap, D } = this.selectedGun.Overcharged;
      const result = this.epwhammerService.calculateWounds(
        {
          ...this.selectedGun, S, Ap, D,
        },
        Equivalent.Toughness,
        Equivalent.Sv,
        Equivalent.SvIn,
        Equivalent.FnP,
        this.actualmodifiers,
      );
      if (typeof (result) === 'undefined' || result === 0) {
        total = '';
      } else {
        total = result;
      }
    }
    return total;
  }

  calculateProfileWounds(Equivalent: Unit, id: number) {
    let total: number | string = '';
    const gun: Gun = this.selectedGun;
    if (typeof (this.selectedGun.profile) !== 'undefined') {
      const profileData = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]];
      if (typeof (profileData) !== 'undefined') {
        const {
          NoS, S, Ap, D,
        } = profileData;
        const result = this.epwhammerService.calculateWounds(
          {
            ...gun, NoS, S, Ap, D,
          },
          Equivalent.Toughness,
          Equivalent.Sv,
          Equivalent.SvIn,
          Equivalent.FnP,
          this.actualmodifiers,
        );
        if (typeof (result) !== 'undefined' && result !== 0) {
          total = result;
        }
      }
    }
    return total;
  }

  calculateProfileDead(Equivalent: Unit, id: number) {
    let total: number | string = '';
    const gun: Gun = this.selectedGun;
    if (typeof (this.selectedGun.profile) !== 'undefined') {
      const profileData = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]];
      if (typeof (profileData) !== 'undefined') {
        const {
          NoS, S, Ap, D,
        } = profileData;
        const result = this.epwhammerService.calculateDeadModels(
          {
            ...gun, NoS, S, Ap, D,
          },
          Equivalent.Toughness,
          Equivalent.Sv,
          Equivalent.SvIn,
          Equivalent.FnP,
          this.actualmodifiers,
          Equivalent.W,
        );
        if (typeof (result) !== 'undefined') {
          total = result;
        }
      }
    }
    return total;
  }

  calculateMeltaWounds(Equivalent: Unit, id: number) {
    let total: number | string = '';
    if (typeof (this.selectedGun.melta) !== 'undefined') {
      const profileData = this.selectedGun.melta[Object.keys(this.selectedGun.melta)[id]];
      if (typeof (profileData) !== 'undefined') {
        const result = this.epwhammerService.calculateWounds(
          profileData,
          Equivalent.Toughness,
          Equivalent.Sv,
          Equivalent.SvIn,
          Equivalent.FnP,
          this.actualmodifiers,
        );
        if (typeof (result) !== 'undefined' && result !== 0) {
          total = result;
        }
      }
    }
    return total;
  }

  calculateBasicWounds(Equivalent: Unit) {
    let total;
    const result = this.epwhammerService.calculateWounds(
      this.selectedGun,
      Equivalent.Toughness,
      Equivalent.Sv,
      Equivalent.SvIn,
      Equivalent.FnP,
      this.actualmodifiers,
    );
    if (result === 0) {
      total = '0';
    } else {
      total = result;
    }
    return total || '';
  }

  calculateBasicDead(Equivalent: Unit) {
    let total;
    const result = this.epwhammerService.calculateDeadModels(
      this.selectedGun,
      Equivalent.Toughness,
      Equivalent.Sv,
      Equivalent.SvIn,
      Equivalent.FnP,
      this.actualmodifiers,
      Equivalent.W,
    );
    if (result === 0) {
      total = '0';
    } else {
      total = result;
    }
    return total || '';
  }

  calculateOverchargedDead(Equivalent: Unit) {
    let total;
    if (typeof (this.selectedGun.Overcharged) !== 'undefined') {
      const { S } = this.selectedGun.Overcharged;
      const { Ap } = this.selectedGun.Overcharged;
      const { D } = this.selectedGun.Overcharged;
      const result = this.epwhammerService.calculateDeadModels(
        {
          ...this.selectedGun, S, Ap, D,
        },
        Equivalent.Toughness,
        Equivalent.Sv,
        Equivalent.SvIn,
        Equivalent.FnP,
        this.actualmodifiers,
        Equivalent.W,
      );
      if (result === 0) {
        total = '0';
      } else {
        total = result;
      }
    }
    return total || '';
  }

  factionAverageWounds(Equivalent: Unit) {
    let total;
    const result = this.epwhammerService.factionAverageWounds(
      this.allGuns,
      Equivalent.Toughness,
      Equivalent.Sv,
      Equivalent.SvIn,
      Equivalent.FnP,
      this.actualmodifiers,
    );
    if (result === 0) {
      total = '0';
    } else {
      total = result;
    }
    return total || '';
  }

  factionAverageModelsKilled(Equivalent: Unit) {
    let total;
    const result = this.epwhammerService.factionAverageModelsKilled(
      this.allGuns,
      Equivalent.Toughness,
      Equivalent.Sv,
      Equivalent.SvIn,
      Equivalent.FnP,
      this.actualmodifiers,
      Equivalent.W,
    );
    if (result === 0) {
      total = '0';
    } else {
      total = result;
    }
    return total || '';
  }

  getMeltaGunProfile(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = Object.getOwnPropertyNames(this.selectedGun.melta)[id]
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunRange(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].Range
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunType(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].Type
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunNoS(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].NoS
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunS(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].S
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunAp(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].Ap
      : Profile = '';
    return Profile || '';
  }

  getMeltaGunD(id: number): string {
    let Profile;
    this.selectedGun.melta
      // eslint-disable-next-line prefer-destructuring
      ? Profile = this.selectedGun.melta[Object.getOwnPropertyNames(this.selectedGun.melta)[id]].D
      : Profile = '';
    return Profile || '';
  }

  gunProfile(id: number):string {
    let Profile;
    this.selectedGun.profile
      // eslint-disable-next-line prefer-destructuring
      ? Profile = Object.getOwnPropertyNames(this.selectedGun.profile)[id]
      : Profile = '';

    return Profile || '';
  }

  gunProfileRange(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].Range;

    return result;
  }

  gunProfileType(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].Type;

    return result;
  }

  gunProfileNoS(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].NoS;

    return result;
  }

  gunProfileStrength(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].S;

    return result;
  }

  gunProfileAp(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].Ap;

    return result;
  }

  gunProfileDamage(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].D;

    return result;
  }

  gunProfileAbility(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    check === ''
      ? result = ''
      : result = this.selectedGun.profile[Object.keys(this.selectedGun.profile)[id]].Ability;

    return result;
  }

  constructor(public epwhammerService: EpwhammerService, private issueService :IssueService) {
    this.selectedGun = {
      name: '',
      Range: '',
      Type: '',
      NoS: '',
      S: '',
      Ap: '',
      D: '',
      Ability: '',
      Overcharged: '',
      profile: '',
      points: '',
    };
  }

  onSelect(gun: Gun): void {
    this.selectedGun = gun;
  }

  // eslint-disable-next-line class-methods-use-this
  ngAfterViewInit(): void {
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x', 'MEQ', 'TEQ', 'GEQ', 'VEQ', 'KEQ'],
          ['Chosen', this.epwhammerService.calculateWounds(
            this.selectedGun,
            this.marineEquivalent.Toughness,
            this.marineEquivalent.Sv,
            this.marineEquivalent.SvIn,
            this.marineEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.calculateWounds(
            this.selectedGun,
            this.terminatorEquivalent.Toughness,
            this.terminatorEquivalent.Sv,
            this.terminatorEquivalent.SvIn,
            this.terminatorEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.calculateWounds(
            this.selectedGun,
            this.guardsmanEquivalent.Toughness,
            this.guardsmanEquivalent.Sv,
            this.guardsmanEquivalent.SvIn,
            this.guardsmanEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.calculateWounds(
            this.selectedGun,
            this.vehicleEquivalent.Toughness,
            this.vehicleEquivalent.Sv,
            this.vehicleEquivalent.SvIn,
            this.vehicleEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.calculateWounds(
            this.selectedGun,
            this.knightEquivalent.Toughness,
            this.knightEquivalent.Sv,
            this.knightEquivalent.SvIn,
            this.knightEquivalent.FnP,
            this.actualmodifiers,
          )],
          ['Average Wounds', this.epwhammerService.factionAverageWounds(
            this.allGuns,
            this.marineEquivalent.Toughness,
            this.marineEquivalent.Sv,
            this.marineEquivalent.SvIn,
            this.marineEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.factionAverageWounds(
            this.allGuns,
            this.terminatorEquivalent.Toughness,
            this.terminatorEquivalent.Sv,
            this.terminatorEquivalent.SvIn,
            this.terminatorEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.factionAverageWounds(
            this.allGuns,
            this.guardsmanEquivalent.Toughness,
            this.guardsmanEquivalent.Sv,
            this.guardsmanEquivalent.SvIn,
            this.guardsmanEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.factionAverageWounds(
            this.allGuns,
            this.vehicleEquivalent.Toughness,
            this.vehicleEquivalent.Sv,
            this.vehicleEquivalent.SvIn,
            this.vehicleEquivalent.FnP,
            this.actualmodifiers,
          ), this.epwhammerService.factionAverageWounds(
            this.allGuns,
            this.knightEquivalent.Toughness,
            this.knightEquivalent.Sv,
            this.knightEquivalent.SvIn,
            this.knightEquivalent.FnP,
            this.actualmodifiers,
          )],
        ],
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            rotate: -45,
            multiline: false,
          },
        },
      },
      legend: {
        show: true,
      },
    });
  }
}

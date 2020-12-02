/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { Gun } from '../home';
import { MEQ, TEQ, GEQ } from '../mock-epwhammer';

@Component({
  selector: 'app-average-chosen',
  templateUrl: './average-chosen.component.html',
  styleUrls: ['./average-chosen.component.css'],
})
export class AverageChosenComponent {
  selectedGun: any;

  marineEquivalent = MEQ;

  terminatorEquivalent = TEQ;

  guardsmanEquivalent = GEQ;

  guns$: Observable <Gun[]> = this.issueService.getIssues();

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
    if (this.selectedGun.Ap === 0) {
      ap = '0';
    } else {
      ap = this.selectedGun.Ap;
    }
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
    if (this.selectedGun.points === 0) {
      cost = '0';
    } else {
      cost = this.selectedGun.points;
    }
    return cost || '';
  }

  get overcharged() {
    let overChargeProfile;
    if (this.selectedGun.Overcharged) {
      overChargeProfile = 'Overcharged';
    } else {
      overChargeProfile = '';
    }
    return overChargeProfile || '';
  }

  get overchargedStrength() {
    let result;
    if (this.selectedGun.Overcharged) {
      result = this.selectedGun.Overcharged.S || '';
    }
    return result;
  }

  get overchargedAP() {
    let result;
    if (this.selectedGun.Overcharged) {
      result = this.selectedGun.Overcharged.Ap || '';
    }
    return result;
  }

  get overchargedD() {
    let result;
    if (this.selectedGun.Overcharged) {
      result = this.selectedGun.Overcharged.D || '';
    }
    return result;
  }

  get overchargedAbility() {
    let result;
    if (this.selectedGun.Overcharged) {
      result = this.selectedGun.Overcharged.Ability || '';
    }
    return result;
  }

  gunProfile(id: number):string {
    let Profile;
    if (this.selectedGun.profile) {
      // eslint-disable-next-line prefer-destructuring
      Profile = Object.getOwnPropertyNames(this.selectedGun.profile)[id];
    } else {
      Profile = '';
    }
    return Profile || '';
  }

  gunProfileRange(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].Range;
    }
    return result;
  }

  gunProfileType(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].Type;
    }
    return result;
  }

  gunProfileNoS(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].NoS;
    }
    return result;
  }

  gunProfileStrength(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].S;
    }
    return result;
  }

  gunProfileAp(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].Ap;
    }
    return result;
  }

  gunProfileDamage(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].D;
    }
    return result;
  }

  gunProfileAbility(id: number):string {
    const check: string = this.gunProfile(id);
    let result;
    if (check === '') {
      result = '';
    } else {
      const firstKey = Object.keys(this.selectedGun.profile)[id];
      result = this.selectedGun.profile[firstKey].Ability;
    }
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
}

/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in */
import { Component, AfterViewInit, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import * as c3 from 'c3';
import {
  MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EpwhammerService } from '../epwhammer.service';
import { IssueService } from '../issue.service';
import { Gun } from '../home';
import { Unit } from '../DataUnit';
import {
  MEQ, TEQ, GEQ, VEQ, KEQ,
} from '../mockEpwhammer';
import { AverageModifiersComponent } from '../average-modifiers/average-modifiers.component';

@Component({
  selector: 'app-average-chosen',
  templateUrl: './average-chosen.component.html',
  styleUrls: ['./average-chosen.component.css'],
})
export class AverageChosenComponent implements AfterViewInit {
  selectedGun: any;

  chart: any;

  actualmodifiers = this.epwhammerService.currentModifiers;

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
    if (typeof (overchargedProfile) !== 'undefined' && (overchargedProfile) !== '') {
      const { S, Ap, D } = overchargedProfile;
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
      if (result === 0) {
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

  calculateMeltaDead(Equivalent:Unit, id:number) {
    let total: number | string = '';
    if (typeof (this.selectedGun.melta) !== 'undefined') {
      const profileData = this.selectedGun.melta[Object.keys(this.selectedGun.melta)[id]];
      if (typeof (profileData) !== 'undefined') {
        const result = this.epwhammerService.calculateDeadModels(
          profileData,
          Equivalent.Toughness,
          Equivalent.Sv,
          Equivalent.SvIn,
          Equivalent.FnP,
          this.actualmodifiers,
          Equivalent.W,
        );
        if (typeof (result) !== 'undefined' && result !== 0) {
          total = result;
        }
        if (result === 0) {
          total = '0';
        } else {
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
    if (typeof (result) === 'number') {
      if (result === 0) {
        total = '0';
      } else {
        total = result;
      }
    } else {
      total = '';
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

  factionAverageAllWounds(Equivalent: Unit) {
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

  constructor(
    @Optional() public epwhammerService: EpwhammerService,
    @Optional() public issueService :IssueService,
    public matDialog: MatDialog,
  ) {
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

  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'AverageModifiersComponent';
    dialogConfig.height = '500px';
    dialogConfig.width = '700px';
    const modalDialog = this.matDialog.open(AverageModifiersComponent, dialogConfig);
  }

  onSelect(gun: Gun): void {
    this.selectedGun = gun;
    for (let i = 0; i < 4; i += 1) {
      if (this.gunProfile(i) !== '' && typeof (this.selectedGun.profile) !== 'undefined') {
        setTimeout(() => {
          this.chart.load({
            columns: [
              [`profile: ${i}`, this.calculateProfileWounds(
                this.marineEquivalent,
                i,
              ), this.calculateProfileWounds(
                this.terminatorEquivalent,
                i,
              ), this.calculateProfileWounds(
                this.guardsmanEquivalent,
                i,
              ), this.calculateProfileWounds(
                this.vehicleEquivalent,
                i,
              ), this.calculateProfileWounds(
                this.knightEquivalent,
                i,
              ),
              ],
            ],
          });
        }, 200);
      } else {
        setTimeout(() => {
          this.chart.unload({
            ids: `profile: ${i}`,
          });
        }, 200);
      }
    }
    for (let i = 0; i < 2; i += 1) {
      let name: string;
      if (this.getMeltaGunProfile(i) !== '' && typeof (this.selectedGun.melta) !== 'undefined') {
        if (i === 0) {
          name = 'No Melta Range';
        }
        if (i === 1) {
          name = 'Melta Range';
        }
        setTimeout(() => {
          this.chart.load({
            columns: [
              [`${name}`, this.calculateMeltaWounds(
                this.marineEquivalent,
                i,
              ), this.calculateMeltaWounds(
                this.terminatorEquivalent,
                i,
              ), this.calculateMeltaWounds(
                this.guardsmanEquivalent,
                i,
              ), this.calculateMeltaWounds(
                this.vehicleEquivalent,
                i,
              ), this.calculateMeltaWounds(
                this.knightEquivalent,
                i,
              ),
              ],
            ],
          });
        }, 200);
      } else {
        setTimeout(() => {
          this.chart.unload({
            ids: 'No Melta Range',
          });
        }, 200);
        setTimeout(() => {
          this.chart.unload({
            ids: 'Melta Range',
          });
        }, 200);
      }
    }
    if (typeof (this.selectedGun.S) !== 'undefined') {
      setTimeout(() => {
        this.chart.load({
          columns: [
            ['Selected', this.calculateBasicWounds(
              this.marineEquivalent,
            ), this.calculateBasicWounds(
              this.terminatorEquivalent,
            ), this.calculateBasicWounds(
              this.guardsmanEquivalent,
            ), this.calculateBasicWounds(
              this.vehicleEquivalent,
            ), this.calculateBasicWounds(
              this.knightEquivalent,
            )],
          ],
        });
      }, 500);
      if (typeof (this.selectedGun.Overcharged) !== 'undefined') {
        setTimeout(() => {
          this.chart.load({
            columns: [
              ['Overcharged', this.calculateOverchargedWounds(
                this.marineEquivalent,
              ), this.calculateOverchargedWounds(
                this.terminatorEquivalent,
              ), this.calculateOverchargedWounds(
                this.guardsmanEquivalent,
              ), this.calculateOverchargedWounds(
                this.vehicleEquivalent,
              ), this.calculateOverchargedWounds(
                this.knightEquivalent,
              ),
              ],
            ],
          });
        }, 500);
      } else {
        setTimeout(() => {
          this.chart.unload({
            ids: 'Overcharged',
          });
        }, 600);
      }
    } else {
      setTimeout(() => {
        this.chart.unload({
          ids: 'Selected',
        });
      }, 300);
      setTimeout(() => {
        this.chart.unload({
          ids: 'Overcharged',
        });
      }, 300);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  ngAfterViewInit(): void {
    this.chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x', 'MEQ', 'TEQ', 'GEQ', 'VEQ', 'KEQ'],
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

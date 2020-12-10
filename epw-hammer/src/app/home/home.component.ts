/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import { Component } from '@angular/core';
import { Modifiers } from '../DataModifiers';
import { EpwhammerService } from '../epwhammer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public epwhammerService:EpwhammerService) { }

  initialModifiers: Modifiers = {
    Hit: 0,
    Wound: 0,
    Save: 0,
    FnP: 7,
    Damage: 0,
    ModAp: 0,
    SInV: 7,
    rerollHits: 'none',
    rerollWounds: 'none',
    rerollSaved: 'none',
    rerollDamage: 'none',
  };

  getInitialModifiers() {
    return this.epwhammerService.modifiers;
  }

  setInitialModifiers() {
    return this.epwhammerService.setModifiers(this.initialModifiers);
  }
}

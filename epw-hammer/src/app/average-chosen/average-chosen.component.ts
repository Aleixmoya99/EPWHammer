/* eslint-disable no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Gun, MEQ } from '../home';
import { EpwhammerService } from '../epwhammer.service';
import { MARINE } from '../mock-epwhammer';

@Component({
  selector: 'app-average-chosen',
  templateUrl: './average-chosen.component.html',
  styleUrls: ['./average-chosen.component.css'],
})
export class AverageChosenComponent implements OnInit {
  selectedGun: Gun;

  marineEquivalent = MARINE;

  guns: Gun[] = [];

  onSelect(gun: Gun): void {
    this.selectedGun = gun;
  }

  getWargear(): void {
    this.epwhammerService.getWargear()
      .subscribe((guns) => { this.guns = guns; });
  }

  constructor(private epwhammerService: EpwhammerService) {
    this.selectedGun = {
      name: '',
      points: '',
      Range: '',
      Type: '',
      NoS: '',
      S: '',
      Ap: '',
      D: '',
      Ability: '',
    };
  }

  ngOnInit(): void {
    this.getWargear();
  }
}

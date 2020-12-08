/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { Modifiers } from '../DataModifiers';
import { EpwhammerService } from '../epwhammer.service';

@Component({
  selector: 'app-average-modifiers',
  templateUrl: './average-modifiers.component.html',
  styleUrls: ['./average-modifiers.component.css'],
})
export class AverageModifiersComponent implements OnInit {
  actualModifiers: Modifiers | any;

  save() {
    this.epwhammerService.setModifiers(this.actualModifiers);
  }

  constructor(public epwhammerService: EpwhammerService) { }

  ngOnInit(): void {
    this.actualModifiers = this.epwhammerService.modifiers;
  }
}

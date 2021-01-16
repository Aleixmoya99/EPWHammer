import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { VersusMenuComponent } from './versus-menu/versus-menu.component';
import { VersusCustomMenuComponent } from './versus-custom-menu/versus-custom-menu.component';
import { VersusCustomMenu2Component } from './versus-custom-menu2/versus-custom-menu2.component';
import { VersusCustomInsertUnitComponent } from './versus-custom-insert-unit/versus-custom-insert-unit.component';
import { VersusCustomInsertWeaponComponent } from './versus-custom-insert-weapon/versus-custom-insert-weapon.component';
import { VersusBeginComponent } from './versus-begin/versus-begin.component';
import { VersusChooseComponent } from './versus-choose/versus-choose.component';
import { VersusChoose2Component } from './versus-choose2/versus-choose2.component';
import { VersusModifiersComponent } from './versus-modifiers/versus-modifiers.component';
import { VersusOptionsComponent } from './versus-options/versus-options.component';
import { VersusOutputComponent } from './versus-output/versus-output.component';
import { AverageChosenComponent } from './average-chosen/average-chosen.component';
import { AverageModifiersComponent } from './average-modifiers/average-modifiers.component';

const routes: Routes = [
  { path: 'versusMenu', component: VersusMenuComponent },
  { path: 'versusBegin', component: VersusBeginComponent },
  { path: 'versusChoose', component: VersusChooseComponent },
  { path: 'versusChoose2', component: VersusChoose2Component },
  { path: 'versusModifiers', component: VersusModifiersComponent },
  { path: 'versusOptions', component: VersusOptionsComponent },
  { path: 'versusOutput', component: VersusOutputComponent },
  { path: 'versusCustomMenu', component: VersusCustomMenuComponent },
  { path: 'versusCustomMenu2', component: VersusCustomMenu2Component },
  { path: 'versusCustomInsertUnit', component: VersusCustomInsertUnitComponent },
  { path: 'versusCustomInsertWeapon', component: VersusCustomInsertWeaponComponent },
  { path: 'averageChoose', component: AverageChosenComponent },
  { path: 'averageModifiers', component: AverageModifiersComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [RouterModule],

})
export class AppRoutingModule { }

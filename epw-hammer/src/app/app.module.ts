import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { VersusMenuComponent } from './versus-menu/versus-menu.component';
import { VersusCustomMenuComponent } from './versus-custom-menu/versus-custom-menu.component';
import { VersusCustomMenu2Component } from './versus-custom-menu2/versus-custom-menu2.component';
import { VersusCustomInsertUnitComponent } from './versus-custom-insert-unit/versus-custom-insert-unit.component';
import { VersusCustomInsertWeaponComponent } from './versus-custom-insert-weapon/versus-custom-insert-weapon.component';
import { VersusChooseComponent } from './versus-choose/versus-choose.component';
import { VersusChoose2Component } from './versus-choose2/versus-choose2.component';
import { VersusBeginComponent } from './versus-begin/versus-begin.component';
import { VersusOutputComponent } from './versus-output/versus-output.component';
import { VersusModifiersComponent } from './versus-modifiers/versus-modifiers.component';
import { VersusOptionsComponent } from './versus-options/versus-options.component';
import { IssueService } from './issue.service';

import { AverageModifiersComponent } from './average-modifiers/average-modifiers.component';
import { PopUpChoseAverageComponent } from './pop-up-chose-average/pop-up-chose-average.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VersusMenuComponent,
    VersusCustomMenuComponent,
    VersusCustomMenu2Component,
    VersusCustomInsertUnitComponent,
    VersusCustomInsertWeaponComponent,
    VersusChooseComponent,
    VersusBeginComponent,
    VersusOutputComponent,
    VersusModifiersComponent,
    VersusOptionsComponent,
    AverageModifiersComponent,
    PopUpChoseAverageComponent,
    VersusChoose2Component,
    VersusCustomMenu2Component,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    RouterModule,
  ],
  providers: [IssueService],
  bootstrap: [AppComponent],
  entryComponents: [AverageModifiersComponent],
})
export class AppModule { }

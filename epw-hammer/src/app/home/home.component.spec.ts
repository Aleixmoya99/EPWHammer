/* eslint-disable class-methods-use-this */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { PopUpChoseAverageComponent } from '../pop-up-chose-average/pop-up-chose-average.component';
import { HomeComponent } from './home.component';
import { Modifiers } from '../DataModifiers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [MatDialogModule],
      providers: [{ provide: MatDialog, useValue: { } }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test getter', () => {
    const mockInitialModifiers: Modifiers = {
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
    const myModifiers = component.getInitialModifiers();

    expect(myModifiers).toEqual(mockInitialModifiers);
  });
  it('test setter', () => {
    const mockSetModifiers: Modifiers = {
      Hit: 0,
      Wound: 1,
      Save: -1,
      FnP: 7,
      Damage: 0,
      ModAp: 0,
      SInV: 7,
      rerollHits: 'none',
      rerollWounds: 'none',
      rerollSaved: 'none',
      rerollDamage: 'none',
    };
    component.initialModifiers = mockSetModifiers;
    const myModifiers = component.setInitialModifiers();

    expect(myModifiers).toEqual(mockSetModifiers);
  });
});

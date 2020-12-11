import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AverageModifiersComponent } from './average-modifiers.component';
import { EpwhammerService } from '../epwhammer.service';
import { Modifiers } from '../DataModifiers';

describe('Save Function', () => {
  let component: AverageModifiersComponent;
  let fixture: ComponentFixture<AverageModifiersComponent>;
  let service: EpwhammerService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageModifiersComponent, MatDialogRef],
      imports: [],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call save()', () => {
    const spyedFunctionSave = spyOn(component, 'save').and.callThrough();
    component.save();
    expect(spyedFunctionSave).toHaveBeenCalled();
  });
  it('should reset modifiers', () => {
    const newModifiers: Modifiers = {
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
    const spyedFunctionSet = spyOn(service, 'setModifiers').and.callThrough();
    const result = component.resetModifiers();
    expect(result).toHaveBeenCalled();
  });
});

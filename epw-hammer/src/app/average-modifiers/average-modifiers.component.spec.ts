import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageModifiersComponent } from './average-modifiers.component';

describe('AverageModifiersComponent', () => {
  let component: AverageModifiersComponent;
  let fixture: ComponentFixture<AverageModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageModifiersComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageModifiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('Save Function', () => {
  let component: AverageModifiersComponent;
  let fixture: ComponentFixture<AverageModifiersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AverageModifiersComponent],
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
});

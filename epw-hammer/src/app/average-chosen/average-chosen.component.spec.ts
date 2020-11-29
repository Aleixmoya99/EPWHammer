import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageChosenComponent } from './average-chosen.component';

describe('AverageChosenComponent', () => {
  let component: AverageChosenComponent;
  let fixture: ComponentFixture<AverageChosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageChosenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

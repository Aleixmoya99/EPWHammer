import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpChoseAverageComponent } from './pop-up-chose-average.component';

describe('PopUpChoseAverageComponent', () => {
  let component: PopUpChoseAverageComponent;
  let fixture: ComponentFixture<PopUpChoseAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpChoseAverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpChoseAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

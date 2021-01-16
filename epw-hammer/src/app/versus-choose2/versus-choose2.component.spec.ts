import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersusChoose2Component } from './versus-choose2.component';

describe('VersusChoose2Component', () => {
  let component: VersusChoose2Component;
  let fixture: ComponentFixture<VersusChoose2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersusChoose2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersusChoose2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

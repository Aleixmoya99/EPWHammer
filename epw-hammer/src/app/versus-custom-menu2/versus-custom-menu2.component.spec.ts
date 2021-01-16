import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersusCustomMenu2Component } from './versus-custom-menu2.component';

describe('VersusCustomMenu2Component', () => {
  let component: VersusCustomMenu2Component;
  let fixture: ComponentFixture<VersusCustomMenu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersusCustomMenu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersusCustomMenu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

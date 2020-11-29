import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragesMenuComponent } from './averages-menu.component';

describe('AveragesMenuComponent', () => {
  let component: AveragesMenuComponent;
  let fixture: ComponentFixture<AveragesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AveragesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AveragesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

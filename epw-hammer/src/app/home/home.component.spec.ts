import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modifiers } from '../DataModifiers';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
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
});

describe('test get and set', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should call get', () => {
    const mockInitialModifiers:Modifiers = {
      Hit: 0,
      Wound: 0,
      Save: 0,
      FnP: 7,
      Damage: 0,
      ModAp: 0,
      SInV: 7,
    };
    const getInitialModifiers = component.getInitialModifiers();
    expect(getInitialModifiers).toEqual(mockInitialModifiers);
  });
  it('should call set', () => {
    const initialModifiers:Modifiers = {
      Hit: 0,
      Wound: 0,
      Save: 0,
      FnP: 7,
      Damage: 0,
      ModAp: 0,
      SInV: 7,
    };
    const setInitialModifiers = component.setInitialModifiers();
    expect(setInitialModifiers).toEqual(initialModifiers);
  });
});

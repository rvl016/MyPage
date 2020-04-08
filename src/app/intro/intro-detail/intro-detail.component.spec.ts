import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroDetailComponent } from './intro-detail.component';

describe('IntroDetailComponent', () => {
  let component: IntroDetailComponent;
  let fixture: ComponentFixture<IntroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

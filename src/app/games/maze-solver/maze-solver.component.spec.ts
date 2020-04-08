import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MazeSolverComponent } from './maze-solver.component';

describe('MazeSolverComponent', () => {
  let component: MazeSolverComponent;
  let fixture: ComponentFixture<MazeSolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeSolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeSolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

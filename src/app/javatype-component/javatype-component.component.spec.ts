import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavatypeComponentComponent } from './javatype-component.component';

describe('JavatypeComponentComponent', () => {
  let component: JavatypeComponentComponent;
  let fixture: ComponentFixture<JavatypeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavatypeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavatypeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

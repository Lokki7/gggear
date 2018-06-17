import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GgdjComponent } from './ggdj.component';

describe('GgdjComponent', () => {
  let component: GgdjComponent;
  let fixture: ComponentFixture<GgdjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GgdjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GgdjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApogGenerateComponent } from './apog-generate.component';

describe('ApogGenerateComponent', () => {
  let component: ApogGenerateComponent;
  let fixture: ComponentFixture<ApogGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApogGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApogGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

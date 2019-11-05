import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CprrDataUsageComponent } from './cprr-data-usage.component';

describe('CprrDataUsageComponent', () => {
  let component: CprrDataUsageComponent;
  let fixture: ComponentFixture<CprrDataUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CprrDataUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CprrDataUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

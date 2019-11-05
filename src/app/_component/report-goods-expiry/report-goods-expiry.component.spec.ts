import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGoodsExpiryComponent } from './report-goods-expiry.component';

describe('ReportGoodsExpiryComponent', () => {
  let component: ReportGoodsExpiryComponent;
  let fixture: ComponentFixture<ReportGoodsExpiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGoodsExpiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGoodsExpiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

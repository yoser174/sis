import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGoodsConsumptionsComponent } from './report-goods-consumptions.component';

describe('ReportGoodsConsumptionsComponent', () => {
  let component: ReportGoodsConsumptionsComponent;
  let fixture: ComponentFixture<ReportGoodsConsumptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGoodsConsumptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGoodsConsumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

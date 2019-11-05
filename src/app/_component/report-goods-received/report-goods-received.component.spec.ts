import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGoodsReceivedComponent } from './report-goods-received.component';

describe('ReportGoodsReceivedComponent', () => {
  let component: ReportGoodsReceivedComponent;
  let fixture: ComponentFixture<ReportGoodsReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGoodsReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGoodsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

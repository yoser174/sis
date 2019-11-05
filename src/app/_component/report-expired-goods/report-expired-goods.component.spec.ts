import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExpiredGoodsComponent } from './report-expired-goods.component';

describe('ReportExpiredGoodsComponent', () => {
  let component: ReportExpiredGoodsComponent;
  let fixture: ComponentFixture<ReportExpiredGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExpiredGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExpiredGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

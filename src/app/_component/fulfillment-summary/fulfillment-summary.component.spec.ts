import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentSummaryComponent } from './fulfillment-summary.component';

describe('FulfillmentSummaryComponent', () => {
  let component: FulfillmentSummaryComponent;
  let fixture: ComponentFixture<FulfillmentSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulfillmentSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfillmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryStatusComponent } from './expiry-status.component';

describe('ExpiryStatusComponent', () => {
  let component: ExpiryStatusComponent;
  let fixture: ComponentFixture<ExpiryStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

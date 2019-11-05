import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InOutManagementComponent } from './in-out-management.component';

describe('InOutManagementComponent', () => {
  let component: InOutManagementComponent;
  let fixture: ComponentFixture<InOutManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InOutManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InOutManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

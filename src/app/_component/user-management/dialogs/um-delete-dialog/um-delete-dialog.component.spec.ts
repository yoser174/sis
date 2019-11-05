import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmDeleteDialogComponent } from './um-delete-dialog.component';

describe('UmDeleteDialogComponent', () => {
  let component: UmDeleteDialogComponent;
  let fixture: ComponentFixture<UmDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

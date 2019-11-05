import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPreOrderGoodsComponent } from './add-pre-order-goods.component';

describe('AddPreOrderGoodsComponent', () => {
  let component: AddPreOrderGoodsComponent;
  let fixture: ComponentFixture<AddPreOrderGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPreOrderGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPreOrderGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

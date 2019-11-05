import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOrderGoodsComponent } from './pre-order-goods.component';

describe('PreOrderGoodsComponent', () => {
  let component: PreOrderGoodsComponent;
  let fixture: ComponentFixture<PreOrderGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreOrderGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreOrderGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

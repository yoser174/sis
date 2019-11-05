import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsMasterDataComponent } from './goods-master-data.component';

describe('GoodsMasterDataComponent', () => {
  let component: GoodsMasterDataComponent;
  let fixture: ComponentFixture<GoodsMasterDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsMasterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsMasterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

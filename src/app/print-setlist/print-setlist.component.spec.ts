import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSetlistComponent } from './print-setlist.component';

describe('PrintSetlistComponent', () => {
  let component: PrintSetlistComponent;
  let fixture: ComponentFixture<PrintSetlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSetlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetlistComponent } from './setlist.component';

describe('SetlistComponent', () => {
  let component: SetlistComponent;
  let fixture: ComponentFixture<SetlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

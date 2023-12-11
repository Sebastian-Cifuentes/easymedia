import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingToSeeComponent } from './nothing-to-see.component';

describe('NothingToSeeComponent', () => {
  let component: NothingToSeeComponent;
  let fixture: ComponentFixture<NothingToSeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NothingToSeeComponent]
    });
    fixture = TestBed.createComponent(NothingToSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewall } from './viewall';

describe('Viewall', () => {
  let component: Viewall;
  let fixture: ComponentFixture<Viewall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viewall]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viewall);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

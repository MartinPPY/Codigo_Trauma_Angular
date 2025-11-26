import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Medics } from './medics';

describe('Medics', () => {
  let component: Medics;
  let fixture: ComponentFixture<Medics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Medics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Medics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

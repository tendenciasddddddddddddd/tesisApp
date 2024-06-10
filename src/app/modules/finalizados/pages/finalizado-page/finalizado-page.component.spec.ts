import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizadoPageComponent } from './finalizado-page.component';

describe('FinalizadoPageComponent', () => {
  let component: FinalizadoPageComponent;
  let fixture: ComponentFixture<FinalizadoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalizadoPageComponent]
    });
    fixture = TestBed.createComponent(FinalizadoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

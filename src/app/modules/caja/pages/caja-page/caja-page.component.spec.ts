import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaPageComponent } from './caja-page.component';

describe('CajaPageComponent', () => {
  let component: CajaPageComponent;
  let fixture: ComponentFixture<CajaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CajaPageComponent]
    });
    fixture = TestBed.createComponent(CajaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciaPageComponent } from './agencia-page.component';

describe('AgenciaPageComponent', () => {
  let component: AgenciaPageComponent;
  let fixture: ComponentFixture<AgenciaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciaPageComponent]
    });
    fixture = TestBed.createComponent(AgenciaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

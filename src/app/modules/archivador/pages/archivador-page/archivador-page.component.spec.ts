import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivadorPageComponent } from './archivador-page.component';

describe('ArchivadorPageComponent', () => {
  let component: ArchivadorPageComponent;
  let fixture: ComponentFixture<ArchivadorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchivadorPageComponent]
    });
    fixture = TestBed.createComponent(ArchivadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

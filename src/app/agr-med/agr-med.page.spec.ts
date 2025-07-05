import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgrMedPage } from './agr-med.page';

describe('AgrMedPage', () => {
  let component: AgrMedPage;
  let fixture: ComponentFixture<AgrMedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgrMedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

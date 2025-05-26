import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistromedPage } from './registromed.page';

describe('RegistromedPage', () => {
  let component: RegistromedPage;
  let fixture: ComponentFixture<RegistromedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistromedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

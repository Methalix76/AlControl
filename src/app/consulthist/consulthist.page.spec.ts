import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsulthistPage } from './consulthist.page';

describe('ConsulthistPage', () => {
  let component: ConsulthistPage;
  let fixture: ComponentFixture<ConsulthistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulthistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

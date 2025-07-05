import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VermedPage } from './vermed.page';

describe('VermedPage', () => {
  let component: VermedPage;
  let fixture: ComponentFixture<VermedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VermedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ATesteoPage } from './a-testeo.page';

describe('ATesteoPage', () => {
  let component: ATesteoPage;
  let fixture: ComponentFixture<ATesteoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ATesteoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

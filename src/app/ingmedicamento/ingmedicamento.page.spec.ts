import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IngmedicamentoPage } from './ingmedicamento.page';

describe('IngmedicamentoPage', () => {
  let component: IngmedicamentoPage;
  let fixture: ComponentFixture<IngmedicamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IngmedicamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMispublicacionesPage } from './agregar-mispublicaciones.page';

describe('AgregarMispublicacionesPage', () => {
  let component: AgregarMispublicacionesPage;
  let fixture: ComponentFixture<AgregarMispublicacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarMispublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

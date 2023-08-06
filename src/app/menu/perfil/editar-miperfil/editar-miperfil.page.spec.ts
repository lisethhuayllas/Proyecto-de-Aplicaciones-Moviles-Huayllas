import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarMiperfilPage } from './editar-miperfil.page';

describe('EditarMiperfilPage', () => {
  let component: EditarMiperfilPage;
  let fixture: ComponentFixture<EditarMiperfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarMiperfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

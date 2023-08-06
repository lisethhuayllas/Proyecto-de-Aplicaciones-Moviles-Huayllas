import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MispublicacionesPage } from './mispublicaciones.page';

describe('MispublicacionesPage', () => {
  let component: MispublicacionesPage;
  let fixture: ComponentFixture<MispublicacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MispublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

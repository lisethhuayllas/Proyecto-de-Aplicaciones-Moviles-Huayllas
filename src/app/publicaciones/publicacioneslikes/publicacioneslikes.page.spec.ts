import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacioneslikesPage } from './publicacioneslikes.page';

describe('PublicacioneslikesPage', () => {
  let component: PublicacioneslikesPage;
  let fixture: ComponentFixture<PublicacioneslikesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicacioneslikesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

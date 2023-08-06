import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicacionesdislikesPage } from './publicacionesdislikes.page';

describe('PublicacionesdislikesPage', () => {
  let component: PublicacionesdislikesPage;
  let fixture: ComponentFixture<PublicacionesdislikesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicacionesdislikesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

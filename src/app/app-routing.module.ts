import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

 
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'miperfil',
    loadChildren: () => import('./paginas/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
  },
  {
    path: 'sidemenu',
    loadChildren: () => import('./paginas/sidemenu/sidemenu.module').then( m => m.SidemenuPageModule)
  },
  {
    path: 'agregar-publicacion',
    loadChildren: () => import('./paginas/agregar-publicacion/agregar-publicacion.module').then( m => m.AgregarPublicacionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

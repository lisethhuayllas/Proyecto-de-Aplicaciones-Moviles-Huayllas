import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {canActivate,  redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['login']);

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
    path: 'about',
    loadChildren: () => import('./menu/about/about.module').then( m => m.AboutPageModule)
   
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./menu/inicio/inicio.module').then( m => m.InicioPageModule),

 
  },
  {
    path: 'miperfil',
    loadChildren: () => import('./menu/perfil/miperfil/miperfil.module').then( m => m.MiperfilPageModule)
  },

  {
    path: 'editar-miperfil',
    loadChildren: () => import('./menu/perfil/editar-miperfil/editar-miperfil.module').then( m => m.EditarMiperfilPageModule)
  },
  {
    path: 'mispublicaciones',
    loadChildren: () => import('./menu/misregistros/mispublicaciones/mispublicaciones.module').then( m => m.MispublicacionesPageModule)
  },
  {
    path: 'agregar-mispublicaciones',
    loadChildren: () => import('./menu/misregistros/agregar-mispublicaciones/agregar-mispublicaciones.module').then( m => m.AgregarMispublicacionesPageModule)
  },

  {
    path: 'agregar-mispublicaciones/:id',
    loadChildren: () => import('./menu/misregistros/agregar-mispublicaciones/agregar-mispublicaciones.module').then( m => m.AgregarMispublicacionesPageModule)
  },

  {
    path: 'publicacioneslikes',
    loadChildren: () => import('./publicaciones/publicacioneslikes/publicacioneslikes.module').then( m => m.PublicacioneslikesPageModule)
  },
  {
    path: 'publicacionesdislikes',
    loadChildren: () => import('./publicaciones/publicacionesdislikes/publicacionesdislikes.module').then( m => m.PublicacionesdislikesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
